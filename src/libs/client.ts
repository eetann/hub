import {createClient} from "microcms-js-sdk";

export type MicroCMSClientObj = ReturnType<typeof createClient>;

export const isDraft = (item: any): item is {draftKey: string} => {
  return item?.draftKey && typeof item.draftKey === "string";
};

export const client: MicroCMSClientObj = createClient({
  serviceDomain: "eetann",
  apiKey: process.env.API_KEY,
});
