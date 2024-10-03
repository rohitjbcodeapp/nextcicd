import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch additional data from your API
    const apiResponse = await fetch("http://jsonapi.test/api.php", { next: { revalidate: 10 } });
    const apiData = await apiResponse.json();

    // Assuming apiData is an array of objects
    const currentTime = new Date().toISOString(); // Get current time for lastmod
    const newUrls: string[] = []; // Array to hold new URLs

    // Process each item to extract URLs and metadata
    apiData.forEach((item: { page_title: string; last_modified: string; priority: number; }) => {
      const slug = item.page_title; // Adjust based on your API response
      const lastModified = item.last_modified || currentTime; // Use item's last_modified or current time
      const priority = item.priority || 0.5; // Default priority if not provided

      // console.log("Processing API item => ", slug);

      // Construct the new URL entry
      const urlEntry = `
        <url>
          <loc>${`https://mdxdemo.test/updatedblog/${slug}`}</loc>
          <lastmod>${lastModified}</lastmod>
          <changefreq>daily</changefreq>
          <priority>${priority}</priority>
        </url>
      `;

      newUrls.push(urlEntry);
    });

    // Create the XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
      ${newUrls.join("")}
    </urlset>`;

    // Return the sitemap with correct content type
    const response = new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        // Set caching headers for auto-update every 10 seconds
        "Cache-Control": "s-maxage=10, stale-while-revalidate=9",
      },
    });

    return response;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
