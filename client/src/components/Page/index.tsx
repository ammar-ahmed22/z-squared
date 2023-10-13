import React from "react";
import { Container, Box } from "@chakra-ui/react";
import Navigation, { NavigationOption } from "./Navigation";
import Footer from "./Footer";

interface PageProps {
  children: React.ReactNode,
  navigationOption?: NavigationOption
}

const Page : React.FC<PageProps> = ({ children, navigationOption }) => {
  
  return (
    <>
      <Container maxW={{ base: "100%", md: "container.lg" }} minHeight="100vh" pos="relative" >
        <Box height="10px" width="100vw" pos="absolute" top="0" right="50%" transform="translateX(50%)" bg="brand.green.500" />
        <Box height="10px" width="100vw" pos="absolute" bottom="0" right="50%" transform="translateX(50%)" bg="brand.green.500" />
        <Navigation active={navigationOption} />
        {children}
        <Footer />
      </Container>
    </>
  )
}

export default Page