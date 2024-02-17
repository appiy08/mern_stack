import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// UI Component
import {
  Flex,
  Box,
  Spacer,
  Image,
  HStack,
  VStack,
  Button,
  useDisclosure,
  Show,
  Hide,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const NavMenu = ({ title, to }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? 600 : "",
          color: isPending ? "grey" : "teal",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}
    >
      {title}
    </NavLink>
  );
};
NavMenu.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <React.Fragment>
      <header style={{ padding: "1rem 1.75rem" ,backgroundColor:"#fff"}}>
        <Flex>
          <Box>
          <NavLink to="/">
            <Image src="./vite.svg" alt="Brand Logo" />
          </NavLink>
          </Box>
          <Spacer />
          <Box>
            <Show below="md">
              <Button variant="ghost" ref={btnRef} onClick={onOpen}>
                <Icon as={HamburgerIcon}/>
              </Button>
            </Show>
            <Hide below="md">
              <HStack spacing="24px">
                <NavMenu title="Home" to="/" />
              </HStack>
            </Hide>
          </Box>
        </Flex>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navbar</DrawerHeader>
            <DrawerBody>
              <VStack align="flex-start" spacing="24px">
                <NavMenu title="Home" to="/" />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
