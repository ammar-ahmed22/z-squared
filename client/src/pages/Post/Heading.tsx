import React from "react";
import { IMetadata } from "@z-squared/types";
import { 
  Box,
  Heading,
  Text,
  Tag,
  HStack 
} from "@chakra-ui/react";
import { HeadingSkeleton } from "./skeletons";
import { formatDistance } from "date-fns";

type PostHeadingProps = {
  data?: IMetadata | undefined,
  isLoading?: boolean
}

const PostHeading : React.FC<PostHeadingProps> = ({ isLoading, data }) => {

  if (!isLoading && data){
    const { 
      name,
      authors,
      categories,
      publishDate,
      image 
    } = data;
    const elapsed = formatDistance(new Date(publishDate), new Date(), { addSuffix: true });
    return (
      <Box>
        <Heading
          size="2xl"
          fontFamily="heading"
          as="h1"
          mb="2"
          lineHeight="base"
        >{data.name}</Heading>
        <Text
          fontSize="lg"
          mb="1"
          color="brand2.dark.300"
        >
          By: {authors.join(", ")}
        </Text>
        <Text color="brand2.dark.300" mb="2" >{elapsed}</Text>
        <HStack mb="2" >
          {
            categories.map( category => {
              return (
                <Tag
                  key={category}
                  variant="solid"
                  colorScheme="gray"
                >{category}</Tag>
              )
            })
          }
        </HStack>
      </Box>
    )
  } else {
    return <HeadingSkeleton />
  }
  
}


export default PostHeading;