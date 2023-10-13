import React from "react";
import { 
  HStack,
  Text,
  Link,
  Icon,
  VStack
} from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {

  return (
    <VStack mt="5" pb="5"  >
      <Text fontWeight="bold" fontSize="lg" >Connect with us!</Text>
      <HStack justify="center" w="100%" spacing="5" >
        <Text>Zaryab{" "}
          <Link color="brand.green.500" fontSize="lg" verticalAlign="middle" href="https://www.linkedin.com/in/zaryab-ahmed/" isExternal >
              <Icon as={FaLinkedin} />
          </Link>
        </Text>
        <Text>Zaid{" "}
          <Link color="brand.green.500" fontSize="lg" verticalAlign="middle" href="https://www.linkedin.com/in/zaid-marfatia/" isExternal >
            <Icon as={FaLinkedin} />
          </Link>
        </Text>
      </HStack>
      <Text fontSize="sm" >Built with 💚 by <Link color="brand.green.500" href="https://ammarahmed.ca" isExternal >Ammar Ahmed</Link></Text>
      <Text fontSize="sm" >All Rights Reserved © </Text>
    </VStack>
  )
}

export default Footer;