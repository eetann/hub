import Image from 'next/image'
import {MicroCMSClientObj} from "../libs/client";
import {MicroCMSImage, MicroCMSListContent, MicroCMSListResponse, MicroCMSContentId, MicroCMSDate} from "microcms-js-sdk";
import {
  Box,
  Wrap,
  WrapItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link,
} from "@chakra-ui/react";
import {ExternalLinkIcon} from '@chakra-ui/icons'

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
      {works.map((work) => {
        const {isOpen, onOpen, onClose} = useDisclosure();
        return (
          <>
            <WrapItem key={work.id} bg="white"
              p="4"
              rounded="4"
              boxShadow="base"
              _hover={{boxShadow: "dark-lg"}}
              onClick={onOpen}
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
                  mt="1"
                  fontWeight="semibold"
                  isTruncated
                >{work.name}</Box>
              </Box>
            </WrapItem>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{work.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{work.body}</ModalBody>
                <ModalFooter>
                  <Link href={work.url} isExternal mx="auto" fontSize="lg" fontWeight="semibold">
                    Here!
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      })}
    </Wrap>
  )
}

export const getWorks = async (client: MicroCMSClientObj): Promise<WorkContent[]> => {
  const data = await client.get<MicroCMSListResponse<ContentScheme>>(
    {endpoint: "work"}
  );
  return data.contents;
}
