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
    const redirectUrl = "/login"
    return res.status(201).json({
      newUser,
      redirectUrl
    });
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
    const jwt = await new jose.SignJWT({ id: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);
    const redirectUrl = user.role === "admin" ? "/admin" : "/";

    return res.status(200).json({
      token: jwt,
      redirectUrl,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during login: ", error);
    return res.status(500).json({ error: "Failed to log in" });
  }
});

//localhost:3001/user
router.get('/', async (req, res) => {
  try {
    const result = await prisma.user.findMany();
    return res.status(200).json({ result });
  } catch (err) {
    console.error("Error fetching users: ", err);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params; 
  try {
    const result = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "User deleted successfully", result });
  } catch (err) {
    console.error("Error deleting user: ", err);
    return res.status(500).json({ error: "Failed to delete user" });
  }
});


router.put('/edit/:id', async (req, res) => {
  const { email, role } = req.body; 
  const { id } = req.params; 

  try {
    const result = await prisma.user.update({
      where: {
        id: id, 
      },
      data: {
        email: email, 
        role: role,   
      },
    });
    
    return res.status(200).json({ message: "User updated successfully", result });
  } catch (err) {
    console.error("Error updating user: ", err);
    return res.status(500).json({ error: "Failed to update user" });
  }
});





module.exports = router;
