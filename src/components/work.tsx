import Image from 'next/image'
import {MicroCMSClientObj} from "../libs/client";
import {MicroCMSImage, MicroCMSListContent, MicroCMSListResponse, MicroCMSContentId, MicroCMSDate} from "microcms-js-sdk";
import {Box, Wrap, WrapItem} from "@chakra-ui/react";

// https://eetann.microcms.io/apis/work/settings/model
interface ContentScheme extends MicroCMSListContent {
  name: string;
  body?: string;
  url?: string;
  image?: MicroCMSImage;
}

export type WorkContent = ContentScheme & MicroCMSContentId & MicroCMSDate;

export function Work({works}: {works: WorkContent[]}) {
  return (
    <Wrap spacing={5} align="center">
      {works.map((work) => (
        <WrapItem key={work.id} bg="white"
          p="4"
          rounded="4"
          boxShadow="base"
          _hover={{boxShadow: "dark-lg"}}
        >
          <Box maxW="sm">
            <Image
              src={typeof work.image !== "undefined" ? work.image.url : "https://placehold.jp/450x300.png"}
              alt={work.name}
              width={450}
              height={300}
              objectFit="contain"
            />
            <Box as="h4"
              fontWeight="semibold"
              isTruncated
            >{work.name}</Box>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  )
}

export const getWorks = async (client: MicroCMSClientObj): Promise<WorkContent[]> => {
  const data = await client.get<MicroCMSListResponse<ContentScheme>>(
    {endpoint: "work"}
  );
  return data.contents;
}
