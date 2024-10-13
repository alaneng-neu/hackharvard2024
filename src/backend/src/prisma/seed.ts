import { PrismaClient } from "@prisma/client";
import { userQueryArgs } from "../prisma-query-args/user.query-args";

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
      googleId: "123", 
    }, ...userQueryArgs
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
      googleId: "456",
    }, ...userQueryArgs
  });
  const location4 = await prisma.location.create({ data: { address: '123 Food St, Cityville' } });
  const location5 = await prisma.location.create({ data: { address: '456 Retail Ave, Townsville' } });
  const location6 = await prisma.location.create({ data: { address: '789 Health Blvd, Wellness City' } });
  const location7 = await prisma.location.create({ data: { address: '101 Entertainment Rd, Fun Town' } });
  const location8 = await prisma.location.create({ data: { address: '202 Tech Park, Innovate City' } });

  // Create users
  const user5 = await prisma.user.create({
    data: {
      googleId: 'google-id-1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      businesses: { create: [{ name: 'Alice\'s Cafe', description: 'A cozy place to enjoy delicious food and drinks.', locationId: location1.id, businessTypes: { set: ['FOOD_AND_BEVERAGE'] } }] },
    },
  });

  const user6 = await prisma.user.create({
    data: {
      googleId: 'google-id-2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      businesses: { create: [{ name: 'Bob\'s Clothing Store', description: 'Trendy clothing and accessories for all.', locationId: location2.id, businessTypes: { set: ['CLOTHING_AND_ACCESSORIES'] } }] },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@smallbiz.com",
      businesses: {
        create: [
          {
            name: "The Spa",
            description: "Relax and rejuvenate",
            locationId: location3.id,
            businessTypes: {
              set: ["HEALTH_AND_WELLNESS"],
            },
          },
        ],
      },
      googleId: "456",
    }, ...userQueryArgs
  });

  const user4 = await prisma.user.create({
    data: {
      name: "Sam",
      email: "sam@smallbiz.com",
      businesses: {
        create: [
          {
            name: "Sam's Spa",
            description: "Relax and rejuvenate",
            locationId: location3.id,
            businessTypes: {
              set: ["HEALTH_AND_WELLNESS"],
            },
          },
        ],
      },
      googleId: "456",
    }, ...userQueryArgs
  });

  // Create promotions
  const promotion1 = await prisma.promotion.create({
    data: {
      businessId: user1.businesses[0].id,
      quantity: 100,
      type: 'PERCENT_DISCOUNT',
      value: 20.0,
    },
  });

  const promotion2 = await prisma.promotion.create({
    data: {
      businessId: user2.businesses[0].id,
      quantity: 50,
      type: 'VALUE_DISCOUNT',
      value: 10.0,
    },
  });

  const promotion3 = await prisma.promotion.create({
    data: {
      businessId: user3.businesses[0].id,
      quantity: 30,
      type: 'PERCENT_DISCOUNT',
      value: 15.0,
    },
  });

  const promotion4 = await prisma.promotion.create({
    data: {
      businessId: user4.businesses[0].id,
      quantity: 70,
      type: 'VALUE_DISCOUNT',
      value: 5.0,
    },
  });

  const promotion5 = await prisma.promotion.create({
    data: {
      businessId: user1.businesses[0].id,
      quantity: 50,
      type: 'VALUE_DISCOUNT',
      value: 8.0,
    },
  });

  // Create coupons for redeeming promotions
  await prisma.coupon.create({
    data: {
      promotionId: promotion1.id,
      userId: user2.id,
      redeemedAt: new Date(),
    },
  });

  await prisma.coupon.create({
    data: {
      promotionId: promotion3.id,
      userId: user1.id,
      redeemedAt: new Date(),
    },
  });

  await prisma.coupon.create({
    data: {
      promotionId: promotion2.id,
      userId: user3.id,
      redeemedAt: new Date(),
    },
  });

  await prisma.coupon.create({
    data: {
      promotionId: promotion4.id,
      userId: user4.id,
      redeemedAt: new Date(),
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
