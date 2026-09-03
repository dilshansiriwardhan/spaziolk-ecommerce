"use server";

import { addToFav  , getFav} from "@/lib/add-fav";

export async function addToFavAction(
  productId: string,
) {
  // Later you should get the real user email from session
  return await addToFav("bob@gmail.com", productId);
}

export async function getFavAction() {
  return await getFav("bob@gmail.com");
}
