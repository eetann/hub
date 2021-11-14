import {createClient} from "microcms-js-sdk";

export type MicroCMSClientObj = ReturnType<typeof createClient>;

export const client: MicroCMSClientObj = createClient({
  serviceDomain: "eetann",
  apiKey: process.env.API_KEY,
});
