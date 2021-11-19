import Image from 'next/image'
import {MicroCMSClientObj} from "../libs/client";
import {MicroCMSImage, MicroCMSListContent, MicroCMSListResponse, MicroCMSContentId, MicroCMSDate} from "microcms-js-sdk";
import {Tooltip, Wrap, WrapItem} from "@chakra-ui/react";

// https://eetann.microcms.io/apis/bio/settings/model
interface ContentScheme extends MicroCMSListContent {
  name: string;
  url?: string;
  icon?: MicroCMSImage;
  from?: string;
}

export type BioContent = ContentScheme & MicroCMSContentId & MicroCMSDate;

export function Bio({bios}: {bios: BioContent[]}) {
  return (
    <Wrap px="1rem" spacing={4} justify="center" align="center">
      {bios.map((bio) => (
        <Tooltip label={bio.name}>
          <a href={bio.url} target="_blank" rel="noopener noreferrer">
            <WrapItem key={bio.id} bg="white" lineHeight="0"
              padding="1"
              rounded="4"
              boxShadow="base"
              _hover={{boxShadow: "outline"}}
            >
              <Image
                src={bio.icon.url}
                alt={bio.name}
                width={24}
                height={24}
              />
            </WrapItem>
          </a></Tooltip>
      ))}
    </Wrap>
  )
}

export const getBios = async (client: MicroCMSClientObj): Promise<BioContent[]> => {
  const data = await client.get<MicroCMSListResponse<ContentScheme>>(
    {endpoint: "bio"}
  );
  return data.contents;
}
