import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

import { user } from "./auth";

export const location = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const InsertLocation = createInsertSchema(location, {
  name: z.string({
    error: issue => !issue.input
      ? "This field is required"
      : "This field must be a string",
  })
    .min(1, "Name must be at least 1 character long")
    .max(100, "Name must not be longer than 100 characters"),
  description: field => field.max(1000).optional(),
  lat: z.number({
    error: issue => !issue.input
      ? "This field is required"
      : "This field must be a number",
  })
    .min(-90, "Number must be greater than or equal to -90")
    .max(90, "Number must be less than or equal to 90"),
  long: z.number({
    error: issue => issue.input === undefined
      ? "This field is required"
      : "This field must be a number",
  })
    .min(-180, "Number must be greater than or equal to -180")
    .max(180, "Number must be less than or equal to 180"),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});
