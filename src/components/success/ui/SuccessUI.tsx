
import { ReactNode, useState } from "react";
import { Box, Text, Link, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Router from "next/router";

export default function SuccessUI() {
  const backToDonate = () => {
    Router.push("/");
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection="column"
        minHeight={"100vh"}
        alignItems="center"
        justifyContent={"center"}
      >
        <CheckCircleIcon boxSize={180} color={"green"} />
        <Text  fontSize={"36px"} fontWeight={"bold"}>
          Success Donate!
        </Text>
        <Text my={4} fontSize={"20px"} fontWeight={"medium"}>
          Thank you for participating and donating!
        </Text>
        <Button onClick={backToDonate} w={360} colorScheme="green" size="lg">
          Back to Donate
        </Button>
      </Box>
    </>
  );
}
