import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import roboPunkNFT from "./RoboPunksNFT.json";

const roboPunkNFTAddress = "0x6bA6C92AC7891C02B1546BdC6264B48F0b057299";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunkNFTAddress,
        roboPunkNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response: ", response);
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="40px" textShadow="0 3px 3px #000000">
            Hoemies Exclusive NFTs
          </Text>
          <Text
            fontsize="30px"
            letterSpacing="-5.5%"
            textShadow="0 1.5px 1.5px #000000"
          >
            Each unique. Each beautiful. Discover your own.
          </Text>
        </div>
        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                borderRadius="5px"
                cursor="pointer"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                width="100%"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={mintAmount}
              />
              <Button
                borderRadius="5px"
                cursor="pointer"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              borderRadius="5px"
              cursor="pointer"
              padding="15px"
              marginTop="10px"
              onClick={handleMint}
            >
              Mint Now
            </Button>
          </div>
        ) : (
          <Text
            fontsize="30px"
            letterSpacing="-5.5%"
            textShadow="0 1.5px 1.5px #000000"
          >
            You must be connected to Mint
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
