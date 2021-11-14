import Image from 'next/image'
import {MicroCMSClientObj} from "../libs/client";
import {MicroCMSImage, MicroCMSObjectContent, MicroCMSContentId} from "microcms-js-sdk";
import {Heading, Text, Box, Wrap, WrapItem, Flex, Center} from "@chakra-ui/react";

// https://eetann.microcms.io/apis/profile/settings/model
interface ContentScheme extends MicroCMSObjectContent {
  icon: MicroCMSImage;
  intro: string;
}

export type ProfileContent = ContentScheme & MicroCMSContentId;

export function Profile({profile}: {profile: ProfileContent}) {
  return (
    <Wrap align="center" justify="center">
      <WrapItem>
        <Center>
          <Flex rounded="lg" overflow="hidden" boxShadow="base" m="4">
            <Image
              src={profile.icon.url}
              alt="icon"
              width={128}
              height={128}
            /></Flex>
        </Center>
      </WrapItem>
      <WrapItem>
        <Box>
          <Heading my="2" size="md">eetann</Heading>
          <Text fontSize="md">{profile.intro}</Text>
        </Box>
      </WrapItem>
    </Wrap>
  )
}

export const getProfile = async (client: MicroCMSClientObj): Promise<ProfileContent> => {
  const data = await client.getObject<ProfileContent>(
    {endpoint: "profile"}
  );
  return data;
}
