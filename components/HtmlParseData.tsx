import React, { ReactElement } from "react";
import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

interface HtmlParseDataProps {
  tnode: string;
}

const HtmlParseData: React.FC<HtmlParseDataProps> = ({
  tnode,
}): ReactElement => {
  const { width } = useWindowDimensions();

  return <RenderHTML contentWidth={width} source={{ html: tnode }} />;
};

export default HtmlParseData;
