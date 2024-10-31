const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const result = await prisma.booking.findMany();
    return res.status(200).json({ result });
  } catch (err) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.booking.delete({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .json({ message: "Booking deleted successfully", result });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Log the error for debugging
    console.error("Error deleting booking:", error);
    return res.status(500).json({ error: "Failed to delete booking" });
  }
});

//http://localhost:3001/booking/update/:id
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { checkInDate, checkOutDate, rooms, guests, price } = req.body;
  try {
    const result = await prisma.booking.update({
      where: {
        id: id,
      },
      data: {
        checkInDate,
        checkOutDate,
        rooms,
        guests,
        price,
      },
    });

    

    return res.status(200).json({ message: "Booking updated successfully", result });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({ error: "Failed to update booking" });
  }
});


module.exports = router;
