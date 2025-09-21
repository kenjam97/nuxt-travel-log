import type { DrizzleError } from "drizzle-orm";

import slugify from "slug";

import { InsertLocation } from "~/lib/db/schema";

import { findUniqueSlug, insertLocation } from "../../app/lib/db/queries/location";
import defineAuthenticatedEventHandler from "../utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(event, InsertLocation.safeParse);

  if (!result.success) {
    const statusMessage = result
      .error
      .issues
      .map(issue => `${issue.path.join("")}: ${issue.message}`)
      .join("; ");

    const data = result
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join()] = issue.message;
        return errors;
      }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const userId = event.context.user.id;
  const slug = await findUniqueSlug(userId, slugify(result.data.name, { lower: true }));

  try {
    return insertLocation(result.data, slug, userId);
  }
  catch (e) {
    const error = e as DrizzleError;
    console.error(error);
    throw error;
  }
});
