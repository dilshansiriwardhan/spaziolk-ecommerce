import {
  pgTable,
  text,
  boolean,
  integer,
  real,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable(
  "categories",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    image: text("image"),
    parentId: text("parent_id"),
    productCount: integer("product_count").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("categories_parent_id_idx").on(t.parentId)]
);

export const products = pgTable(
  "products",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    productName: text("product_name").notNull(),
    slug: text("slug").notNull().unique(),
    productType: text("product_type").notNull(),
    description: text("description"),
    productPrice: real("product_price").notNull(),
    compareAtPrice: real("compare_at_price"),
    isActive: boolean("is_active").default(true).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    categoryId: text("category_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("products_category_id_idx").on(t.categoryId),
    index("products_product_type_idx").on(t.productType),
  ]
);

export const productVariants = pgTable(
  "product_variants",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    productId: text("product_id").notNull(),
    sku: text("sku").notNull().unique(),
    size: text("size"),
    color: text("color"),
    colorCode: text("color_code"),
    stock: integer("stock").default(0).notNull(),
    image: text("image"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("product_variants_product_id_idx").on(t.productId),
    index("product_variants_size_idx").on(t.size),
    index("product_variants_color_idx").on(t.color),
  ]
);

export const productImages = pgTable(
  "product_images",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    productId: text("product_id").notNull(),
    url: text("url").notNull(),
    alt: text("alt"),
    position: integer("position").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("product_images_product_id_idx").on(t.productId)]
);

export const productFeatures = pgTable(
  "product_features",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    productId: text("product_id").notNull(),
    name: text("name").notNull(),
  },
  (t) => [index("product_features_product_id_idx").on(t.productId)]
);

export const reviews = pgTable(
  "reviews",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    productId: text("product_id").notNull(),
    userId: text("user_id").notNull(),
    rating: integer("rating").notNull(),
    title: text("title"),
    comment: text("comment"),
    isVerifiedPurchase: boolean("is_verified_purchase").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("reviews_product_user_uidx").on(t.productId, t.userId),
    index("reviews_product_id_idx").on(t.productId),
    index("reviews_user_id_idx").on(t.userId),
  ]
);

export const addresses = pgTable(
  "addresses",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull(),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(),
    addressLine1: text("address_line1").notNull(),
    addressLine2: text("address_line2"),
    city: text("city").notNull(),
    state: text("state"),
    postalCode: text("postal_code").notNull(),
    country: text("country").notNull(),
    isDefault: boolean("is_default").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("addresses_user_id_idx").on(t.userId)]
);


export const carts = pgTable(
  "carts",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull(), // one cart per user
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("carts_user_id_uidx").on(t.userId), // one cart per user
    index("carts_user_id_idx").on(t.userId),
  ]
);

export const cartItems = pgTable(
  "cart_items",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    cartId: text("cart_id").notNull(),
    productId: text("product_id").notNull(),
    variantId: text("variant_id"), // nullable if product has no variants
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("cart_items_cart_id_idx").on(t.cartId),
    index("cart_items_product_id_idx").on(t.productId),
    index("cart_items_variant_id_idx").on(t.variantId),
    // Prevent duplicate product+variant in the same cart
    uniqueIndex("cart_items_cart_product_variant_uidx").on(
      t.cartId,
      t.productId,
      t.variantId
    ),
  ]
);

export const favourites = pgTable(
  "favourites",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull(),
    productId: text("product_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    // A user can favourite a product only once
    uniqueIndex("favourites_user_product_uidx").on(t.userId, t.productId),
    index("favourites_user_id_idx").on(t.userId),
    index("favourites_product_id_idx").on(t.productId),
  ]
);



export const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
  variant: one(productVariants, {
    fields: [cartItems.variantId],
    references: [productVariants.id],
  }),
}));

// ---- Favourites Relations ----
export const favouritesRelations = relations(favourites, ({ one }) => ({
  user: one(users, {
    fields: [favourites.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [favourites.productId],
    references: [products.id],
  }),
}));

// Relations (optional but useful for queries)
export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
  addresses: many(addresses),
  cart: many(carts),          // ← add
  favourites: many(favourites), // ← add
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  variants: many(productVariants),
  features: many(productFeatures),
  reviews: many(reviews),
  cartItems: many(cartItems),     // ← add
  favourites: many(favourites),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "CategoryTree",
  }),
  children: many(categories, { relationName: "CategoryTree" }),
  products: many(products),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
}));

export const productFeaturesRelations = relations(productFeatures, ({ one }) => ({
  product: one(products, {
    fields: [productFeatures.productId],
    references: [products.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),

  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));


