import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
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

  await db.delete(reviews);
  await db.delete(productFeatures);
  await db.delete(productImages);
  await db.delete(productVariants);
  await db.delete(products);
  await db.delete(addresses);
  await db.delete(categories);
  await db.delete(users);

  const [user1, user2] = await db
    .insert(users)
    .values([
      { name: "Alice Johnson", email: "[email protected 1]" },
      { name: "Bob Smith", email: "[email protected 2]" },
    ])
    .returning();

  const [catClothing] = await db
    .insert(categories)
    .values([
      {
        name: "Clothing",
        slug: "clothing",
        description: "Apparel and accessories",
      },
    ])
    .returning();

  const clothingProducts = await db
    .insert(products)
    .values([
      {
        productName: "Classic Cotton Tee",
        slug: "classic-cotton-tee",
        productType: "clothing",
        description: "Soft everyday t-shirt in premium cotton",
        productPrice: 24.99,
        compareAtPrice: 29.99,
        isActive: true,
        isFeatured: false,
        categoryId: catClothing.id,
      },
      {
        productName: "Slim Fit Chinos",
        slug: "slim-fit-chinos",
        productType: "clothing",
        description: "Comfortable slim-fit chinos for work or casual wear",
        productPrice: 49.99,
        compareAtPrice: 59.99,
        isActive: true,
        isFeatured: true,
        categoryId: catClothing.id,
      },
      {
        productName: "Oversized Hoodie",
        slug: "oversized-hoodie",
        productType: "clothing",
        description: "Cozy oversized hoodie with fleece lining",
        productPrice: 54.99,
        compareAtPrice: 69.99,
        isActive: true,
        isFeatured: true,
        categoryId: catClothing.id,
      },
      {
        productName: "Denim Jacket",
        slug: "denim-jacket",
        productType: "clothing",
        description: "Classic mid-wash denim jacket",
        productPrice: 79.99,
        compareAtPrice: 99.99,
        isActive: true,
        isFeatured: false,
        categoryId: catClothing.id,
      },
      {
        productName: "Linen Summer Shirt",
        slug: "linen-summer-shirt",
        productType: "clothing",
        description: "Breathable linen shirt perfect for warm weather",
        productPrice: 39.99,
        compareAtPrice: 49.99,
        isActive: true,
        isFeatured: false,
        categoryId: catClothing.id,
      },
      {
        productName: "Cargo Pants",
        slug: "cargo-pants",
        productType: "clothing",
        description: "Utility cargo pants with multiple pockets",
        productPrice: 44.99,
        compareAtPrice: 54.99,
        isActive: true,
        isFeatured: false,
        categoryId: catClothing.id,
      },
      {
        productName: "Ribbed Knit Sweater",
        slug: "ribbed-knit-sweater",
        productType: "clothing",
        description: "Soft ribbed knit sweater for cooler days",
        productPrice: 59.99,
        compareAtPrice: 74.99,
        isActive: true,
        isFeatured: true,
        categoryId: catClothing.id,
      },
      {
        productName: "High-Waist Jeans",
        slug: "high-waist-jeans",
        productType: "clothing",
        description: "Stretch high-waist jeans with a flattering fit",
        productPrice: 64.99,
        compareAtPrice: 79.99,
        isActive: true,
        isFeatured: false,
        categoryId: catClothing.id,
      },
      {
        productName: "Athletic Joggers",
        slug: "athletic-joggers",
        productType: "clothing",
        description: "Lightweight joggers for training and everyday wear",
        productPrice: 34.99,
        compareAtPrice: 44.99,
        isActive: true,
        isFeatured: false,
        categoryId: catClothing.id,
      },
      {
        productName: "Wool Blend Coat",
        slug: "wool-blend-coat",
        productType: "clothing",
        description: "Warm wool-blend coat for winter layering",
        productPrice: 129.99,
        compareAtPrice: 159.99,
        isActive: true,
        isFeatured: true,
        categoryId: catClothing.id,
      },
    ])
    .returning();

  // Images for all 10 products
  await db.insert(productImages).values(
    clothingProducts.map((product) => ({
      productId: product.id,
      url: `https://placehold.co/400x600?text=${encodeURIComponent(product.productName)}`,
      alt: product.productName,
      position: 0,
    }))
  );

  // Sample variants for first 3 products
  const [tee, chinos, hoodie] = clothingProducts;

  await db.insert(productVariants).values([
    {
      productId: tee.id,
      sku: "CCT-M-NAVY",
      size: "M",
      color: "Navy",
      colorCode: "#001F3F",
      stock: 50,
      isActive: true,
    },
    {
      productId: tee.id,
      sku: "CCT-L-NAVY",
      size: "L",
      color: "Navy",
      colorCode: "#001F3F",
      stock: 40,
      isActive: true,
    },
    {
      productId: chinos.id,
      sku: "SFC-32-KHAKI",
      size: "32",
      color: "Khaki",
      colorCode: "#C3B091",
      stock: 30,
      isActive: true,
    },
    {
      productId: hoodie.id,
      sku: "OH-L-BLACK",
      size: "L",
      color: "Black",
      colorCode: "#000000",
      stock: 20,
      isActive: true,
    },
  ]);

  // Features
  await db.insert(productFeatures).values([
    { productId: tee.id, name: "100% cotton" },
    { productId: tee.id, name: "Machine washable" },
    { productId: chinos.id, name: "Stretch fabric" },
    { productId: hoodie.id, name: "Fleece lined" },
  ]);

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

  await db.insert(reviews).values([
    {
      productId: tee.id,
      userId: user1.id,
      rating: 5,
      title: "Great fit",
      comment: "Soft and comfortable.",
      isVerifiedPurchase: true,
    },
    {
      productId: hoodie.id,
      userId: user2.id,
      rating: 4,
      title: "Warm and cozy",
      comment: "Perfect for cold days.",
      isVerifiedPurchase: true,
    },
  ]);

  console.log(`Seed complete. Inserted ${clothingProducts.length} clothing products.`);
  await client.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});