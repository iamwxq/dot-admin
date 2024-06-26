import { setupWorker } from "msw/browser";

import authHandler from "@/mocks/features/auth/handlers";

export const worker = setupWorker(
  ...authHandler,
);
