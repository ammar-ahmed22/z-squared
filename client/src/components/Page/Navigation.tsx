import React from "react";
import DarkLogo from "../../assets/images/DarkLogo.png";
import LightLogo from "../../assets/images/LightLogo.png";
import DarkLogov2 from "../../assets/images/z-squared-dark-logo-removed.png"
import LightLogov2 from "../../assets/images/z-squared-light-logo-removed.png"
import { 
  HStack,
  Image,
  useColorModeValue,
  Link,
  Text,  
} from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";



const NAVIGATION_OPTIONS = ["home", "about", "articles"] as const;

export type NavigationOption = typeof NAVIGATION_OPTIONS[number]

export interface NavigationProps {
  active?: NavigationOption
}

const Navigation : React.FC<NavigationProps> = ({ active }) => {
  const logoSrc = LightLogov2;
  const logoFilter = useColorModeValue("invert(8%) sepia(12%) saturate(1141%) hue-rotate(177deg) brightness(98%) contrast(89%)", "invert(98%) sepia(5%) saturate(3260%) hue-rotate(301deg) brightness(111%) contrast(63%)")
  // const logoSrc = useColorModeValue(LightLogov2, DarkLogov2);
  const greenFilter = "invert(45%) sepia(53%) saturate(548%) hue-rotate(116deg) brightness(90%) contrast(90%)"
  const textColor = useColorModeValue("brand2.dark.900", "brand2.light.500");
  const capitalize = (str: string) => {
    return str[0].toUpperCase() + str.substring(1);
  }
  return (
    <HStack h="10vh" justify="space-between"  >
      <Link as={ReactLink} to="/" p="5" display="flex" justifyContent="center" alignItems="center">
        <Image src={logoSrc} h="5vh" filter={greenFilter} />
        <Text fontSize="md" ml="3" fontFamily="heading" fontWeight="extrabold" >Z Squared</Text>
      </Link>
      <HStack px="10" spacing="4" >
        {
          NAVIGATION_OPTIONS.map((option) => {
            return (
              <Link
                key={option} 
                as={ReactLink}
                to={"/" + (option === "home" ? "" : option)}
                fontWeight={active === option ? "bold" : "normal"}
                pos="relative"
                // color={active === option ? "brand2.green.500" : "current"}
                _after={{
                  content: '" "',
                  pos: "absolute",
                  height: "2px",
                  width: "50%",
                  bg: "brand2.green.500",
                  bottom: 0,
                  left: "50%",
                  transform: "translate(-50%)",
                  display: active === option ? "block" : "none",
                  transition: "all ease-in .1s"
                }}
                _hover={{
                  fontWeight: "bold",
                  transition: "all ease-in .1s"
                }}
                transition="all ease-in .1s"
              >
                {capitalize(option)}
              </Link>
            )
          })
        }
        <ColorModeSwitcher />
      </HStack>
      
    </HStack>
  )
};

export default Navigation

