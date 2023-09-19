import React from "react";
import { useQuery } from "@apollo/client";
import { METADATA_QUERY, MetadataQuery } from "../../graphql/queries/Metadata";
import { 
  VStack,
  Text,
  HStack,
  Image,
  Box 
} from "@chakra-ui/react";

const Featured: React.FC = () => {

  const { data, loading, error } = useQuery<MetadataQuery.Response, MetadataQuery.Variables>(METADATA_QUERY, {
    variables: {
      featured: true,
      onlyPublished: true
    }
  })

  React.useEffect(() => {
    if (!loading && data) {
      console.log(data.metadata);
    }
  }, [data, loading, error])

  return (
    <VStack align="flex-start" p="5" >
      <Text fontFamily="heading" fontSize="4xl" fontWeight="bold" color="brand2.green.700" >Featured Posts</Text>
      {
        !loading && data && (
          data.metadata.map((metadata) => {
            return (
              <HStack key={metadata.id}>
                <Image src={metadata.image}  h="30vh" w="50vh" objectFit="cover" />
                <Box>
                  <Text fontFamily="heading" fontSize="4xl" fontWeight="bold" >{metadata.name}</Text>
                  <Text>{metadata.description.map(r => r.plainText).join("")}</Text>
                </Box>
              </HStack>
            )
          })
        )
      }
    </VStack>
  )
}

export default Featured;