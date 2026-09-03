import { db } from "@/db";
import { users, carts, cartItems, favourites } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function addToFav(userEmail: string, productId: string) {
  try {
    // 1. Find the user
    const user = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, userEmail),
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // 3. Add / update cart item
    const [item] = await db
      .insert(favourites)
      .values({
        userId: user.id,
        productId,
      })
      .onConflictDoNothing({
        target: [favourites.userId, favourites.productId],
      })
      .returning();

    return { success: true, data: item };
  } catch (error) {
    console.error("addToFav error:", error);
    return { success: false, error: "Failed to add item to Favourites" };
  }
}

export type Fav = Awaited<ReturnType<typeof getFav>>;

export async function getFav(userEmail: string) {
  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, userEmail),
    
  });

  if (!user) return null;

  const fav = await db.query.favourites.findMany({
    where: (c, { eq }) => eq(c.userId, user.id),
    with: {
      product:{
        with:{
          images:true,
        }
      }
    },
  });

  return fav;
}
