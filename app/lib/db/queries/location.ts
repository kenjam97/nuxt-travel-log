import { and, eq, like } from "drizzle-orm";

import type { InsertLocation } from "../schema";

import db from "..";
import { location } from "../schema";

export async function findLocationBySlug(userId: number, slug: string) {
  return await db
    .select()
    .from(location)
    .where(and(
      eq(location.userId, userId),
      eq(location.slug, slug),
    ))
    .get();
}

export async function findLocations(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}

export async function findMatchingSlugs(userId: number, slug: string) {
  return await db
    .select({ slug: location.slug })
    .from(location)
    .where(and(
      eq(location.userId, userId),
      like(location.slug, `${slug}%`),
    ));
}

export async function findUniqueSlug(userId: number, baseSlug: string) {
  const rows = await findMatchingSlugs(userId, baseSlug);

  const existingSlugs = new Set(rows.map(r => r.slug));
  let slug = baseSlug;
  if (existingSlugs.has(slug)) {
    let i = 2;
    while (existingSlugs.has(`${baseSlug}-${i}`)) i += 1;
    slug = `${baseSlug}-${i}`;
  }

  return slug;
}

export async function insertLocation(data: InsertLocation, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...data,
    slug,
    userId,
  }).returning();

  return created;
};
