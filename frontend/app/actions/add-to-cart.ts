"use server";


import { addToCart , getCart} from "@/lib/add-cart";


export async function addToCartAction(
  productId: string,
  variantId: string | null = null,
  quantity: number = 1
) {
  // Later you should get the real user email from session
  return await addToCart("bob@gmail.com", productId, variantId, quantity);
}

export async function getCartAction() {
  return await getCart("bob@gmail.com");
}