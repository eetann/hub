import {GetStaticPropsContext} from "next";
import {client} from "../libs/client";
import {Bio, BioContent, getBios} from "../components/bio"
import {Profile, ProfileContent, getProfile} from "../components/profile"
import {Work, WorkContent, getWorks} from "../components/work"
import {Box, Center} from "@chakra-ui/react";

export default function Home({bios, profile, works}: {bios: BioContent[], profile: ProfileContent, works: WorkContent[]}) {
  return (
    <Box>
      <Box m="4">
        <Profile profile={profile} />
        <Bio bios={bios} />
      </Box>
      <Center w="80%" mx="auto">
        <Work works={works} />
      </Center>
    </Box>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const bios = await getBios(client);
  const profile = await getProfile(client);
  const works = await getWorks(client);
  return {
    props: {
      bios: bios,
      profile: profile,
      works: works,
    }
  };
}
