const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//http://localhost:3001/room
router.get("/", async (req, res) => {
  try {
    const roomResult = await prisma.room.findMany();
    return res.status(200).json(roomResult);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

router.put('/update' , async (req,res) => {
  try{
    const result = await prisma.room.updateMany({
      where : {
        available : false
      },
      data : {
        available : true
      }
    })
    return res.status(201).json({
      result,
      message: "reset successfully",
    });
  }catch(error){
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ error: "Failed to fetch rooms" });
  }
})

router.post("/booking", async (req, res) => {
  try {
    const { userId, roomTypes, guests, checkInDate, checkOutDate , totalPrice } = req.body;

    if (!userId || !roomTypes || !guests || !checkInDate || !checkOutDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const rooms = []; 

    for (const type of roomTypes) {
      const availableRooms = await prisma.room.findMany({
        where: {
          type,
          available: true,
        },
      });

      if (availableRooms.length === 0) {
        return res.status(400).json({ error: `No available rooms of type: ${type}` });
      }

      const randomRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
      await prisma.room.update({
        where: { id: randomRoom.id },
        data: { available: false },
      });

      rooms.push({
        roomId: randomRoom.id,
        type: randomRoom.type, 
        number: randomRoom.number,
      });
 
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        rooms, 
        guests,
        checkInDate,
        checkOutDate,
        price: totalPrice,
      },
    });

    return res.status(201).json({
      booking,
      message: "Rooms booked successfully",
    });
  } catch (error) {
    console.error("Error booking rooms:", error);
    return res.status(500).json({ error: "Failed to book rooms" });
  }
});


//http://localhost:3001/room/update/:id
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { price, available } = req.body;

  if (price === undefined || available === undefined) {
    return res.status(400).json({ error: "Price and availability must be provided." });
  }

  try {
    const result = await prisma.room.update({
      where: {
        id: id, 
      },
      data: {
        price: price,
        available: available,
      },
    });

    return res.status(200).json({ message: "Room updated successfully", result });
  } catch (error) {
    console.error("Error updating room:", error);
    return res.status(500).json({ error: "Failed to update room" });
  }
});





module.exports = router;
