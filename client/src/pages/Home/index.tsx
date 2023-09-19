import React from "react";
import { 
  Box,
  Image,
  Container,
  Text,
  HStack,
  VStack,
  Center,
  Button 
} from "@chakra-ui/react";
// import mountain1 from "../../assets/images/mountain1.jpg";
// import mountain2 from "../../assets/images/mountain2.jpg";
import mountain3 from "../../assets/images/mountain3.jpg";
import darkLogo from "../../assets/images/z-squared-light-logo-removed.png"
import Featured from "./Featured";


const Home: React.FC = () => {
  // const lightFilter = "invert(98%) sepia(5%) saturate(3260%) hue-rotate(301deg) brightness(111%) contrast(63%)"
  const greenFilter = "invert(45%) sepia(53%) saturate(548%) hue-rotate(116deg) brightness(90%) contrast(90%)"
  return (
    <Box
      pos="relative"
      width="100vw"
      left="calc(-50vw + 50%)"
      height="100vh"
      // border="1px solid red"
      backgroundImage={`url(${mountain3})`}
      backgroundPosition="center"
      backgroundAttachment="fixed"
    >
      <Container maxW={{ base: "100%", md: "container.lg" }} h='100%'>
        <Center flexDirection="column" h="100%" alignItems="flex-start">
          <HStack>
            <Image src={darkLogo} height="15vh" filter={greenFilter} />
          </HStack>
          {/* <Text fontWeight="extrabold" fontSize="8xl" fontFamily="heading" color="brand2.light.500" >Z<Text as="sup" fontSize="6xl" top="-1em" color="brand2.green.500" >2</Text></Text> */}
          <Text fontWeight="extrabold" fontSize="8xl" fontFamily="heading" color="brand2.light.500" >Z Squared</Text>
          <Text color="brand2.light.500">Creed, corporations and culture are just some of the topics we delve into</Text>
          <HStack mt="3" >
            <Button colorScheme="brand2.green" size="lg" >Articles</Button>
            <Button colorScheme="brand2.light"  size="lg" variant="outline" _hover={{ color: "brand2.dark.900", bg: "brand2.light.500" }} >About us</Button>
          </HStack>
        </Center>
        <Featured />
      </Container>
    </Box>
  )
};

export default Home;