import Image from 'next/image'
import {MicroCMSClientObj} from "../libs/client";
import {MicroCMSImage, MicroCMSListContent, MicroCMSListResponse, MicroCMSContentId, MicroCMSDate} from "microcms-js-sdk";
import {
  Text,
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
  Center,
} from "@chakra-ui/react";
import {ExternalLinkIcon} from '@chakra-ui/icons'
import {ModalMarkdown} from "./modal-md"
import {Fragment} from 'react';


// https://eetann.microcms.io/apis/work/settings/model
interface ContentScheme extends MicroCMSListContent {
  name: string;
  body?: string;
  url?: string;
  image?: MicroCMSImage;
}

export type WorkContent = ContentScheme & MicroCMSContentId & MicroCMSDate;

const OneWork = ({work}: {work: WorkContent}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <Fragment key={work.id} >
      <WrapItem bg="white"
        p="4"
        rounded="4"
        boxShadow="base"
        _hover={{boxShadow: "outline"}}
        onClick={onOpen}
        cursor="pointer"
      >
        <Box>
          <Box width="300px" height="250px">
            {typeof work.image !== "undefined" ?
              <Image
                src={work.image.url}
                alt={work.name}
                width="300px"
                height="220px"
                objectFit="contain"
              />
              :
              <Center bgColor="cyan.500"
                fontSize="50px" color="white" fontWeight="semibold"
                height="220px"
              >
                (*&apos;u&apos;*)ノ
              </Center>
            }
          </Box>
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
          {typeof work.body !== "undefined" ?
            <ModalBody>
              {typeof work.image !== "undefined" ?
                <Center>
                  <Image
                    src={work.image.url}
                    alt={work.name}
                    width={450}
                    height={300}
                    objectFit="contain"
                  /></Center> : <></>}
              <ModalMarkdown body={work.body} />
            </ModalBody>
            : <></>}
          <ModalFooter>
            <Link href={work.url} isExternal mx="auto" fontSize="lg" fontWeight="semibold" color="teal.500">
              Here!
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )

};

export function Work({works}: {works: WorkContent[]}) {
  return (
    <Wrap spacing={5} align="center">
      {works.map((work) => {
        <OneWork key={work.id} work={work} />
      })}
    </Wrap>
  )
}

export const getWorks = async (client: MicroCMSClientObj): Promise<WorkContent[]> => {
  const data = await client.get<MicroCMSListResponse<ContentScheme>>(
    {
      endpoint: "work",
    }
  );
  return data.contents;
}
