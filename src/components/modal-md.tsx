import {Link, ListItem, OrderedList, Text, UnorderedList} from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";


type Props = {body: string};

export const ModalMarkdown: React.FC<Props> = ({body}) => {
  return <ReactMarkdown
    components={{
      text: ({children}) => {
        return <Text>{children}</Text>
      },
      p: ({children}) => {
        return <Text mt="4">{children}</Text>
      },
      ul: ({children}) => {
        return <UnorderedList my="2">{children}</UnorderedList>
      },
      ol: ({children}) => {
        return <OrderedList>
          {children}
        </OrderedList>
      },
      li: ({children}) => {
        return <ListItem py="1">{children}</ListItem>
      },
      a: ({children, href}) => {
        return <Link isExternal href={href} color="teal.500">{children}</Link>;
      },
    }}
  >{body}</ReactMarkdown>;
}
