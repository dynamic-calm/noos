import { getAllUsersData } from "@/db/mod";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const users = await getAllUsersData();
  const urls = users!.flatMap((user) => [
    {
      url: `https://noos.mateo.id/${user.userName}`,
      lastModified: user.createdAt,
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    ...user.samplePacks.map((samplePack) => ({
      url: `https://noos.mateo.id/${user.userName}/${samplePack.name}`,
      lastModified: samplePack.createdAt,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ]);

  return [
    {
      url: "https://noos.mateo.id",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://noos.mateo.id/pricing",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...urls,
  ];
}
