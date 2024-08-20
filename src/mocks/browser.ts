import { setupWorker } from "msw/browser";

import sysHandler from "@/mocks/features/sys/handlers";
import userHandler from "@/mocks/features/user/handlers";

export const worker = setupWorker(
  ...sysHandler,
  ...userHandler,
);
