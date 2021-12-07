import { config } from "dotenv";
import server, { port } from "./server";

config();

server.listen(port);
