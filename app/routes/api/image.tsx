import type { LoaderArgs } from "@remix-run/node"
import { imageLoader, DiskCache } from "remix-image/server";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
};

export async function loader({request}: LoaderArgs) {
  return imageLoader(config, request);
};