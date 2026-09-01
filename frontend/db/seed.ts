import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  users,
  categories,
  products,
  productVariants,
  productImages,
  productFeatures,
  reviews,
  addresses,
} from "./schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function seed() {
  console.log("Seeding...");

  // Clear existing data (order matters because of FKs if you add them later)
  await db.delete(reviews);
  await db.delete(productFeatures);
  await db.delete(productImages);
  await db.delete(productVariants);
  await db.delete(products);
  await db.delete(addresses);
  await db.delete(categories);
  await db.delete(users);

  // Users
  const [user1, user2] = await db
    .insert(users)
    .values([
      { name: "Alice Johnson", email: "[email protected 1]" },
      { name: "Bob Smith", email: "[email protected 2]" },
    ])
    .returning();

  // Categories
  const [catElectronics, catClothing, catPhones] = await db
    .insert(categories)
    .values([
      {
        name: "Electronics",
        slug: "electronics",
        description: "Gadgets and devices",
      },
      {
        name: "Clothing",
        slug: "clothing",
        description: "Apparel and accessories",
      },
      {
        name: "Phones",
        slug: "phones",
        description: "Smartphones",
        // parent set after we have electronics id
      },
    ])
    .returning();

  // Set parent for Phones under Electronics
  await db
    .update(categories)
    .set({ parentId: catElectronics.id })
    .where(eq(categories.id, catPhones.id));

  // Products
  const [phone, tshirt] = await db
    .insert(products)
    .values([
      {
        productName: "Pixel Pro X",
        slug: "pixel-pro-x",
        productType: "phone",
        description: "Flagship smartphone with great camera",
        productPrice: 899.99,
        compareAtPrice: 999.99,
        isActive: true,
        isFeatured: true,
        categoryId: catPhones.id,
      },
      {
        productName: "Classic Cotton Tee",
        slug: "classic-cotton-tee",
        productType: "clothing",
        description: "Soft everyday t-shirt",
        productPrice: 24.99,
        compareAtPrice: 29.99,
        isActive: true,
        isFeatured: false,
        categoryId: catClothing.id,
      },
    ])
    .returning();

  // Variants
  await db.insert(productVariants).values([
    {
      productId: phone.id,
      sku: "PPX-BLK-128",
      size: "128GB",
      color: "Black",
      colorCode: "#000000",
      stock: 25,
      isActive: true,
    },
    {
      productId: phone.id,
      sku: "PPX-WHT-256",
      size: "256GB",
      color: "White",
      colorCode: "#FFFFFF",
      stock: 12,
      isActive: true,
    },
    {
      productId: tshirt.id,
      sku: "CCT-M-NAVY",
      size: "M",
      color: "Navy",
      colorCode: "#001F3F",
      stock: 50,
      isActive: true,
    },
    {
      productId: tshirt.id,
      sku: "CCT-L-NAVY",
      size: "L",
      color: "Navy",
      colorCode: "#001F3F",
      stock: 40,
      isActive: true,
    },
  ]);

  // Images
  await db.insert(productImages).values([
    {
      productId: phone.id,
      url: "https://placehold.co/600x600?text=Pixel+Pro+X",
      alt: "Pixel Pro X front",
      position: 0,
    },
    {
      productId: tshirt.id,
      url: "https://placehold.co/600x600?text=Cotton+Tee",
      alt: "Classic Cotton Tee",
      position: 0,
    },
  ]);

  // Features
  await db.insert(productFeatures).values([
    { productId: phone.id, name: "OLED 120Hz display" },
    { productId: phone.id, name: "Triple camera system" },
    { productId: tshirt.id, name: "100% cotton" },
    { productId: tshirt.id, name: "Machine washable" },
  ]);

  // Addresses
  await db.insert(addresses).values([
    {
      userId: user1.id,
      fullName: "Alice Johnson",
      phone: "+1-555-0100",
      addressLine1: "123 Main St",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "US",
      isDefault: true,
    },
  ]);

  // Reviews
  await db.insert(reviews).values([
    {
      productId: phone.id,
      userId: user1.id,
      rating: 5,
      title: "Amazing camera",
      comment: "Best phone I've used this year.",
      isVerifiedPurchase: true,
    },
    {
      productId: tshirt.id,
      userId: user2.id,
      rating: 4,
      title: "Comfortable",
      comment: "Fits well, soft fabric.",
      isVerifiedPurchase: true,
    },
  ]);

  console.log("Seed complete.");
  await client.end();
}

import { eq } from "drizzle-orm";

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});