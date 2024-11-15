const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
  try {
    const result = await prisma.jobApplication.findMany();
    return res.status(200).json({ result });
  } catch (err) {
    console.error("Error getting career data:", err.stack || err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
