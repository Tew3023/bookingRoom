const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const roomResult = await prisma.room.findMany(); 
    return res.status(200).json(roomResult); 
  } catch (error) {
    console.error("Error fetching rooms: ", error); 
    return res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

module.exports = router;
