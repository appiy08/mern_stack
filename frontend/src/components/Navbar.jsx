import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
// UI Component
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Hide,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Show,
  Spacer,
  Stack,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
// Custom
import { get } from "lodash";
import { useLogout } from "../hooks/auth/useLogout";
import { useAuthContext } from "../hooks/context/useAuthContext";

export const NavMenu = ({ title, to, type }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? 600 : type === "btn" ? 500 : "",
          color: isPending ? "grey" : type === "btn" ? "white" : "teal",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}
    >
      {type === "btn" ? <Button colorScheme="teal">{title}</Button> : title}
    </NavLink>
  );
};
NavMenu.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  type: PropTypes.string,
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const btnRef = React.useRef();

  const handleLogout = () => {
    logout();
  };

  return (
    <React.Fragment>
      <header style={{ padding: "1rem 1.75rem", backgroundColor: "#fff" }}>
        <Flex alignItems='center'>
          <Box>
            <NavLink to="/">
              <Image src="./vite.svg" alt="Brand Logo" />
            </NavLink>
          </Box>
          <Spacer />
          <Box>
            <Show below="md">
              <Button variant="ghost" ref={btnRef} onClick={onOpen}>
                <Icon as={HamburgerIcon} />
              </Button>
            </Show>
            <Hide below="md">
              <Stack direction="row" alignItems="center" spacing={4}>
                <NavMenu title="Home" to="/" />
                
              </Stack>
            </Hide>
          </Box>
          <Box ps={4}>
          {get(user, "token", "") !== "" ? (
              <Menu>
                <MenuButton  variant="ghost">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                  />
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Profile">
                    <MenuItem>My Account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
          ) : (
            <Stack direction='row' alignItems='center' spacing={4}><NavMenu title="Signup" to="/signup" type="btn" />
            <NavMenu title="Login" to="/login" type="btn" /></Stack>
          )}
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
