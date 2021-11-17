import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {body: string};

export const ModalMarkdown: React.FC<Props> = ({body}) => {
  return <ReactMarkdown children={body} />;
}
