import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { speakRouter } from "./speak";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  speak: speakRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
