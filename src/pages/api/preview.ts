import type {NextApiRequest, NextApiResponse} from 'next';
import {client} from "../../libs/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.slug) {
    return res.status(404).end();
  }
  const content = await client.get({
    endpoint: "work",
    contentId: (req.query.slug as string),
    queries: {draftKey: (req.query.draftKey as string)}
  }).then().catch((error: any) => console.error(error))
  if (!content) {
    return res.status(401).json({message: "Invalid slug"});
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, {Location: `/`});
  res.end("Preview mode enabled");
}
