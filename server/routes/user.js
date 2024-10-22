const router = require("express").Router();
const { PrismaClient } = require("@prisma/client"); 
const prisma = new PrismaClient(); 

router.post('/post', async (req, res) => {
    try {
        const {  email, password, role } = req.body; 
        const newUser = await prisma.user.create({
            data: {      
                email,     
                password,  
                role,      
            },
        });
        
        return res.status(201).json(newUser); 
    } catch (error) {
        console.error("Error creating user: ", error);
        return res.status(500).json({ error: "Failed to create user" }); 
    }
});

module.exports = router;
