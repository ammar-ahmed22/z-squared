import React from "react";
import { Container } from "@chakra-ui/react";
import Navigation, { NavigationOption } from "./Navigation";
import Footer from "./Footer";

interface PageProps {
  children: React.ReactNode,
  navigationOption?: NavigationOption
}

const Page : React.FC<PageProps> = ({ children, navigationOption }) => {
  
  return (
    <>
      <Container maxW={{ base: "100%", md: "container.lg" }} pos="relative" >
        <Navigation active={navigationOption} />
        {children}
        {/* <Footer /> */}
      </Container>
    </>
  )
}

export default Page