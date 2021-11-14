import {GetStaticProps} from "next";
// import Link from "next/link";
import {client} from "../libs/client";
import {Bio, BioContent, getBios} from "../components/bio"
import {Profile, ProfileContent, getProfile} from "../components/profile"
import {Box} from "@chakra-ui/react";

export default function Home({bios, profile}: {bios: BioContent[], profile: ProfileContent}) {
  return (
    <Box>
      <Profile profile={profile} />
      <Bio bios={bios} />
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const bios = await getBios(client);
  const profile = await getProfile(client);
  return {
    props: {
      bios: bios,
      profile: profile,
    }
  };
}
