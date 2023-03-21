import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";

export const app = Fastify();
app.register(cors, {
  origin: (_origin, cb) => {
    cb(null, true);
  },
});

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  return reply.status(500).send({ message: "Internal server error." });
});
