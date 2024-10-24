const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedRooms() {
  try {
    const mockRooms = [
      { number: 101, type: "Single", price: 100.0, available: true },
      { number: 102, type: "Double", price: 150.0, available: false },
      { number: 103, type: "Suite", price: 300.0, available: true },
      { number: 104, type: "Single", price: 100.0, available: false },
      { number: 105, type: "Double", price: 150.0, available: true },
      { number: 106, type: "Suite", price: 350.0, available: true },
      { number: 107, type: "Single", price: 90.0, available: true },
      { number: 108, type: "Double", price: 170.0, available: false },
      { number: 109, type: "Suite", price: 400.0, available: true },
      { number: 110, type: "Single", price: 110.0, available: true },
    ];

    await prisma.room.createMany({
      data: mockRooms
    });

    console.log("Rooms seeded successfully!");
  } catch (error) {
    console.error("Error seeding rooms:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRooms();
