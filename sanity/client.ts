import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "etofyibz",
  dataset: "production",
  apiVersion: "2025-09-13",
  useCdn: false,
});
