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

  const clothingCategories = await db
    .insert(categories)
    .values([
      {
        name: "Topwear",
        slug: "topwear",
        description: "Clothing worn on the upper body",
      },
      {
        name: "Bottomwear",
        slug: "bottomwear",
        description: "Clothing worn on the lower body",
      },
      {
        name: "Outerwear",
        slug: "outerwear",
        description: "Clothing worn over other garments",
      },
      {
        name: "Activewear",
        slug: "activewear",
        description: "Clothing designed for sports and physical activities",
      },
      {
        name: "Innerwear",
        slug: "innerwear",
        description: "Undergarments worn beneath outer clothing",
      },
      {
        name: "Sleepwear",
        slug: "sleepwear",
        description: "Clothing designed for sleeping and relaxing",
      },
    ])
    .returning();

  const categoryMap = Object.fromEntries(
    clothingCategories.map((category) => [category.slug, category.id]),
  );

  await db.insert(categories).values([
    // Topwear
    {
      name: "T-Shirts",
      slug: "t-shirts",
      parentId: categoryMap.topwear,
    },
    {
      name: "Shirts",
      slug: "shirts",
      parentId: categoryMap.topwear,
    },
    {
      name: "Polos",
      slug: "polos",
      parentId: categoryMap.topwear,
    },
    {
      name: "Tank Tops",
      slug: "tank-tops",
      parentId: categoryMap.topwear,
    },
    {
      name: "Blouses",
      slug: "blouses",
      parentId: categoryMap.topwear,
    },
    {
      name: "Crop Tops",
      slug: "crop-tops",
      parentId: categoryMap.topwear,
    },
    {
      name: "Sweaters",
      slug: "sweaters",
      parentId: categoryMap.topwear,
    },
    {
      name: "Hoodies",
      slug: "hoodies",
      parentId: categoryMap.topwear,
    },

    // Bottomwear
    {
      name: "Jeans",
      slug: "jeans",
      parentId: categoryMap.bottomwear,
    },
    {
      name: "Trousers",
      slug: "trousers",
      parentId: categoryMap.bottomwear,
    },
    {
      name: "Chinos",
      slug: "chinos",
      parentId: categoryMap.bottomwear,
    },
    {
      name: "Shorts",
      slug: "shorts",
      parentId: categoryMap.bottomwear,
    },
    {
      name: "Cargo Pants",
      slug: "cargo-pants",
      parentId: categoryMap.bottomwear,
    },
    {
      name: "Leggings",
      slug: "leggings",
      parentId: categoryMap.bottomwear,
    },
    {
      name: "Skirts",
      slug: "skirts",
      parentId: categoryMap.bottomwear,
    },

    // Outerwear
    {
      name: "Jackets",
      slug: "jackets",
      parentId: categoryMap.outerwear,
    },
    {
      name: "Coats",
      slug: "coats",
      parentId: categoryMap.outerwear,
    },
    {
      name: "Blazers",
      slug: "blazers",
      parentId: categoryMap.outerwear,
    },
    {
      name: "Trench Coats",
      slug: "trench-coats",
      parentId: categoryMap.outerwear,
    },
    {
      name: "Windbreakers",
      slug: "windbreakers",
      parentId: categoryMap.outerwear,
    },
    {
      name: "Vests",
      slug: "vests",
      parentId: categoryMap.outerwear,
    },

    // Activewear
    {
      name: "Sports T-Shirts",
      slug: "sports-t-shirts",
      parentId: categoryMap.activewear,
    },
    {
      name: "Sports Shorts",
      slug: "sports-shorts",
      parentId: categoryMap.activewear,
    },
    {
      name: "Track Pants",
      slug: "track-pants",
      parentId: categoryMap.activewear,
    },
    {
      name: "Sports Leggings",
      slug: "sports-leggings",
      parentId: categoryMap.activewear,
    },
    {
      name: "Sports Bras",
      slug: "sports-bras",
      parentId: categoryMap.activewear,
    },
    {
      name: "Tracksuits",
      slug: "tracksuits",
      parentId: categoryMap.activewear,
    },

    // Innerwear
    {
      name: "Underwear",
      slug: "underwear",
      parentId: categoryMap.innerwear,
    },
    {
      name: "Bras",
      slug: "bras",
      parentId: categoryMap.innerwear,
    },
    {
      name: "Boxers",
      slug: "boxers",
      parentId: categoryMap.innerwear,
    },
    {
      name: "Briefs",
      slug: "briefs",
      parentId: categoryMap.innerwear,
    },
    {
      name: "Undershirts",
      slug: "undershirts",
      parentId: categoryMap.innerwear,
    },
    {
      name: "Camisoles",
      slug: "camisoles",
      parentId: categoryMap.innerwear,
    },

    // Sleepwear
    {
      name: "Pajamas",
      slug: "pajamas",
      parentId: categoryMap.sleepwear,
    },
    {
      name: "Nightgowns",
      slug: "nightgowns",
      parentId: categoryMap.sleepwear,
    },
    {
      name: "Sleep Shirts",
      slug: "sleep-shirts",
      parentId: categoryMap.sleepwear,
    },
    {
      name: "Sleep Shorts",
      slug: "sleep-shorts",
      parentId: categoryMap.sleepwear,
    },
    {
      name: "Robes",
      slug: "robes",
      parentId: categoryMap.sleepwear,
    },
  ]);

  const subCategories = await db
    .insert(categories)
    .values([
      {
        name: "T-Shirts",
        slug: "t-shirts",
        parentId: categoryMap.topwear,
      },
      {
        name: "Shirts",
        slug: "shirts",
        parentId: categoryMap.topwear,
      },
      {
        name: "Jeans",
        slug: "jeans",
        parentId: categoryMap.bottomwear,
      },
      {
        name: "Chinos",
        slug: "chinos",
        parentId: categoryMap.bottomwear,
      },
      {
        name: "Hoodies",
        slug: "hoodies",
        parentId: categoryMap.topwear,
      },
      {
        name: "Jackets",
        slug: "jackets",
        parentId: categoryMap.outerwear,
      },
      {
        name: "Track Pants",
        slug: "track-pants",
        parentId: categoryMap.activewear,
      },
      {
        name: "Boxers",
        slug: "boxers",
        parentId: categoryMap.innerwear,
      },
      {
        name: "Pajamas",
        slug: "pajamas",
        parentId: categoryMap.sleepwear,
      },
    ])
    .returning();

  const subCategoryMap = Object.fromEntries(
    subCategories.map((category) => [category.slug, category.id]),
  );

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
        categoryId: categoryMap["t-shirts"],
      },
      {
        productName: "Oxford Casual Shirt",
        slug: "oxford-casual-shirt",
        productType: "clothing",
        description: "Classic Oxford shirt with a comfortable everyday fit",
        productPrice: 39.99,
        compareAtPrice: 49.99,
        isActive: true,
        isFeatured: true,
        categoryId: categoryMap["shirts"],
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
        categoryId: categoryMap["chinos"],
      },
      {
        productName: "Classic Denim Jeans",
        slug: "classic-denim-jeans",
        productType: "clothing",
        description: "Timeless denim jeans with a comfortable everyday fit",
        productPrice: 64.99,
        compareAtPrice: 79.99,
        isActive: true,
        isFeatured: false,
        categoryId: categoryMap["jeans"],
      },
      {
        productName: "Oversized Fleece Hoodie",
        slug: "oversized-fleece-hoodie",
        productType: "clothing",
        description: "Cozy oversized hoodie with a soft fleece lining",
        productPrice: 54.99,
        compareAtPrice: 69.99,
        isActive: true,
        isFeatured: true,
        categoryId: categoryMap["hoodies"],
      },
      {
        productName: "Classic Denim Jacket",
        slug: "classic-denim-jacket",
        productType: "clothing",
        description: "Versatile mid-wash denim jacket for everyday layering",
        productPrice: 79.99,
        compareAtPrice: 99.99,
        isActive: true,
        isFeatured: false,
        categoryId: categoryMap["jackets"],
      },
      {
        productName: "Relaxed Cargo Pants",
        slug: "relaxed-cargo-pants",
        productType: "clothing",
        description: "Durable cargo pants with multiple utility pockets",
        productPrice: 54.99,
        compareAtPrice: 64.99,
        isActive: true,
        isFeatured: false,
        categoryId: categoryMap["cargo-pants"],
      },
      {
        productName: "Performance Track Pants",
        slug: "performance-track-pants",
        productType: "clothing",
        description:
          "Lightweight track pants designed for training and everyday wear",
        productPrice: 44.99,
        compareAtPrice: 54.99,
        isActive: true,
        isFeatured: false,
        categoryId: categoryMap["track-pants"],
      },
      {
        productName: "Premium Cotton Boxers",
        slug: "premium-cotton-boxers",
        productType: "clothing",
        description: "Breathable cotton boxers designed for everyday comfort",
        productPrice: 19.99,
        compareAtPrice: 24.99,
        isActive: true,
        isFeatured: false,
        categoryId: categoryMap["boxers"],
      },
      {
        productName: "Soft Cotton Pajama Set",
        slug: "soft-cotton-pajama-set",
        productType: "clothing",
        description:
          "Relaxed cotton pajama set designed for comfortable nights",
        productPrice: 34.99,
        compareAtPrice: 44.99,
        isActive: true,
        isFeatured: true,
        categoryId: categoryMap["pajamas"],
      },
    ])
    .returning();

  const productsMap = Object.fromEntries(
    clothingProducts.map((product) => [product.slug, product.id]),
  );
  // Features
  await db.insert(productFeatures).values([
    { productId: productsMap["soft-cotton-pajama-set"], name: "100% cotton" },
    {
      productId: productsMap["soft-cotton-pajama-set"],
      name: "Machine washable",
    },
    {
      productId: productsMap["soft-cotton-pajama-set"],
      name: "Stretch fabric",
    },
    { productId: productsMap["soft-cotton-pajama-set"], name: "Fleece lined" },
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
      productId: productsMap["soft-cotton-pajama-set"],
      userId: user1.id,
      rating: 5,
      title: "Great fit",
      comment: "Soft and comfortable.",
      isVerifiedPurchase: true,
    },
    {
      productId: productsMap["soft-cotton-pajama-set"],
      userId: user2.id,
      rating: 4,
      title: "Warm and cozy",
      comment: "Perfect for cold days.",
      isVerifiedPurchase: true,
    },
  ]);

  // Images for all 10 products
  await db.insert(productImages).values(
    clothingProducts.map((product) => ({
      productId: product.id,
      url: `https://placehold.co/400x600?text=${encodeURIComponent(product.productName)}`,
      alt: product.productName,
      position: 0,
    })),
  );

  console.log(
    `Seed complete. Inserted ${clothingProducts.length} clothing products.`,
  );
  await client.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
