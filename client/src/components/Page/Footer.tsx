import React from "react";
import { 
  HStack,
  Text,
  Box,
  IconButton,
  Link,
  Icon 
} from "@chakra-ui/react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {

  return (
    <HStack h="20vh" justify="space-around" >
      <Box>
        <Text>Zaryab</Text>
        <HStack>
          <Link>
            <Icon as={FaLinkedin} />
            {/* LinkedIn */}
          </Link>
          <Link>
            <Icon as={FaEnvelope} />
            {/* LinkedIn */}
          </Link>
        </HStack>
        
      </Box>
      <Box>
        <Text>Zaid</Text>
        <HStack>
          <Link>
            <Icon as={FaLinkedin} />
            {/* LinkedIn */}
          </Link>
          <Link>
            <Icon as={FaEnvelope} />
            {/* LinkedIn */}
          </Link>
        </HStack>
      </Box>
    </HStack>
  )
}

export default Footer;