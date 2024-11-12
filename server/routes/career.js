const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/get", async (req, res) => {
  try {
    const result = await prisma.career.findMany();
    return res.status(200).json({ result });
  } catch (err) {
    console.error("Error get career data:", err.stack || err);
  }
});

//http://localhost:3000/careers/get/?
router.get('/get/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.career.findUnique({
      where: {
        id: id,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Career not found" });
    }
    return res.status(200).json({ result });
  } catch (err) {
    console.error("Error getting career data:", err.stack || err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
