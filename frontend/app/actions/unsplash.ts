export async function searchPexelsPhotos(query: string, perPage = 10) {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=${perPage}`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pexels photos");
  }

  return response.json();
}