import React from "react";
import { Box, Button, Flex, Link, Spacer } from "@chakra-ui/react";

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/* Left Side - Social Media Icons */}
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link href="https://www.twitter.com">Twitter </Link>
        <Link href="https://www.instagram.com">Instagram </Link>
        <Link href="https://www.youtube.com">Youtube </Link>
      </Flex>

      {/* Right Side - Sections and Connect*/}
      <Flex
        justify="space-around"
        align="center"
        width="40%"
        padding="30px 30px 30px 30px"
      >
        <Box margin="0 15px">About</Box>
        <Spacer />
        <Box margin="0 15px">Mint</Box>
        <Spacer />
        <Box margin="0 15px">Team</Box>
        <Spacer />

        {/* Connect */}
        {isConnected ? (
          <Box margin="0 15px">Connected</Box>
        ) : (
          <Button
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px"
            color="black"
            cursor="pointer"
            padding="8px 16px"
            margin="0 10px"
            onClick={connectAccount}
          >
            Connect
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
