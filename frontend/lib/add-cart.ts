import { db } from "@/db";
import { users, carts, cartItems } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function addToCart(
  userEmail: string,
  productId: string,
  variantId: string | null = null,
  quantity: number = 1
) {
  try {
    // 1. Find the user
    const user = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, userEmail),
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // 2. Find or create the cart
    let cart = await db.query.carts.findFirst({
      where: (c, { eq }) => eq(c.userId, user.id),
    });

    if (!cart) {
      const [newCart] = await db
        .insert(carts)
        .values({ userId: user.id })
        .returning();
      cart = newCart;
    }

    // 3. Add / update cart item
    const [item] = await db
      .insert(cartItems)
      .values({
        cartId: cart.id,
        productId,
        variantId,
        quantity,
      })
      .onConflictDoUpdate({
        target: [cartItems.cartId, cartItems.productId, cartItems.variantId],
        set: {
          quantity: sql`${cartItems.quantity} + ${quantity}`,
          updatedAt: new Date(),
        },
      })
      .returning();

    return { success: true, data: item };
  } catch (error) {
    console.error("addToCart error:", error);
    return { success: false, error: "Failed to add item to cart" };
  }
}


export type Cart = Awaited<ReturnType<typeof getCart>>;
export type CartItem = NonNullable<Cart>["items"][number];

export async function getCart(userEmail: string) {
  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, userEmail),
  });

  if (!user) return null;

  const cart = await db.query.carts.findFirst({
    where: (c, { eq }) => eq(c.userId, user.id),
    with: {
      items: {
        with: {
          product: {
            with: {
              images: true,
            },
          },
          variant: true,
        },
      },
    },
  });

  return cart;
}
