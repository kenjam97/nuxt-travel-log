import type { User } from "better-auth";

export type UserWithId = Omit<User, "id"> & {
  id: number;
};

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: UserWithId;
  }
}
