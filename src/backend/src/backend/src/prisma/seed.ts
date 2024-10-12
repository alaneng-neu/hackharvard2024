import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const location1 = await prisma.location.create({
    data: {
      address: "123 Main St, Boston, MA, 02115, USA",
    },
  });

  const location2 = await prisma.location.create({
    data: {
      address: "456 Location Ave, Cambridge, MA, 02138, USA",
    },
  });

  const location3 = await prisma.location.create({
    data: {
      address: "777 Lucky St, Boston, MA, 02111, USA",
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@smallbiz.com",
      businesses: {
        create: [
          {
            name: "Pizza Place",
            description: "Best pizza in town",
            locationId: location1.id,
            businessTypes: {
              set: ["FOOD_AND_BEVERAGE"],
            },
          },
          {
            name: "Gadget Store",
            description: "Latest tech gadgets",
            locationId: location2.id,
            businessTypes: {
              set: ["RETAIL", "TECHNOLOGY"],
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@smallbiz.com",
      businesses: {
        create: [
          {
            name: "Health Spa",
            description: "Relax and rejuvenate",
            locationId: location3.id,
            businessTypes: {
              set: ["HEALTH_AND_WELLNESS"],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
