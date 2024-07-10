import { setupWorker } from "msw/browser";

import authHandler from "@/mocks/features/sys/handlers";
import userHandler from "@/mocks/features/user/handlers";

export const worker = setupWorker(
  ...authHandler,
  ...userHandler,
);
