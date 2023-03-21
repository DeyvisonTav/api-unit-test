import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./http/routes";

export const app = Fastify();
app.register(cors, {
  origin: (_origin, cb) => {
    cb(null, true);
  },
});

app.register(appRoutes);
