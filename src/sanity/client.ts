import { isDevelopment } from "@/lib/utils";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ku29wh63",
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: false,
});
