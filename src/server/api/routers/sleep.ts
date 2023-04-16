import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Test to update Vercel app with new DATABASE_URL env

export const sleepRouter = createTRPCRouter({
    getAll: publicProcedure
    .query(({ctx}) => {
        return ctx.prisma.sleep.findMany();
    }),
    upsert: publicProcedure
    .input(
        z.object({
          date: z.date(),
          wakeUpTime: z.date().optional(),
          wakeUpTired: z.boolean().optional(),
          getUpTime: z.date().optional(),
          bedTime: z.date().optional(),
          sleepTime: z.date().optional(),
        }),
    )
    .mutation(({ctx, input}) => {
      console.log("tRPC server sleepRouter.upsert:")
      console.log(input)

      return ctx.prisma.sleep.upsert({
        where: {
          date: input.date
        },
        update: input,
        create: input,
      })
    }),
});