const router = require('express').Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


router.get("/", async (req, res) => {
  try {
    const result = await prisma.booking.findMany()
    return res.status(200).json({ result });
  } catch (err) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

module.exports = router;
