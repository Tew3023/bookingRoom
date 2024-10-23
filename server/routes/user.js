const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jose = require("jose");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user: ", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return res.status(404).json({ error: "Email not found" });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect password" });
      }
  
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const jwt = await new jose.SignJWT({ id: user.id, email: user.email, role:user.role }) 
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);
  
      return res.status(200).json({
        token: jwt,
      });
    } catch (error) {
      console.error("Error during login: ", error);
      return res.status(500).json({ error: "Failed to log in" });
    }
  });
  

module.exports = router;
