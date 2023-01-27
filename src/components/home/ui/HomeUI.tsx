import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Router from "next/router";

const Links = ["Home"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function HomeUI() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  type FormInputs = {
    name: string;
    email: string;
    amount: number;
    id_number: string;
    post_code: string;
    unit_number: string;
    address: string;
    remarks: string;
  };

  const idNumberValidation = (text: string) => {
    let firstLetterAvailable = ["S", "T", "G", "F", "M"];
    let txtArr = text.split("");

    let isValidRequired = txtArr.length;
    let isValidLength = txtArr.length === 9;
    let isValidNumber = txtArr.every((e, i) =>
      i === 0
        ? firstLetterAvailable.includes(e)
        : i === 8
        ? /^[A-Z]+$/.test(e)
        : /^[0-9]+$/.test(e)
    );

    if (!isValidRequired) {
      return {
        isValid: isValidRequired,
        message: "ID Number is required",
      };
    }

    if (!isValidLength) {
      return {
        isValid: isValidLength,
        message: "ID Number length must be 9",
      };
    }

    if (!isValidNumber) {
      return {
        isValid: isValidNumber,
        message: "ID Number is invalid format",
      };
    }

    return {
      isValid: true,
    };
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Email is invalid format")
      .required("Email is required"),
    post_code: Yup.string().required("Postal Code is required"),
    unit_number: Yup.string().required("Unit Number is required"),
    amount: Yup.number()
      .positive()
      .moreThan(9, "Donation Amount must be greater than 9")
      .required("Donation Amount is required")
      .typeError("Donation Amount is required"),
    id_number: Yup.string().test("validator-id-number", function (value) {
      const validation = idNumberValidation(value || "");
      if (!validation.isValid) {
        return this.createError({
          path: this.path,
          message: validation.message,
        });
      } else {
        return true;
      }
    }),
  });

  const { register, handleSubmit, reset, formState } = useForm<FormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const onClear = () => {
    reset();
  };

  const onSubmit = (data: FormInputs) => {
    setIsLoading(true);
    fetch("https://heroictent.backendless.app/api/data/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      onClear();
      setIsLoading(false);
      Router.push("/success");
    });
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image alt={"logo"} src={"/logo1.png"} h={36} w={36} />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={"/avatar.jpeg"} />
              </MenuButton>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          borderRadius={"lg"}
          borderWidth={1}
          borderColor={"blue.400"}
          m={8}
          p={8}
        >
          <SimpleGrid columns={[1, null, 2]} spacingY={4} spacingX={10}>
            <FormControl isInvalid={!!errors?.amount?.message}>
              <FormLabel>Donation Amount (S$)</FormLabel>
              <Input
                {...register("amount")}
                placeholder="Donation Amount (S$)"
              />
              {errors?.amount && (
                <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors?.name?.message}>
              <FormLabel>Name</FormLabel>
              <Input {...register("name")} placeholder="Name" />
              {errors?.name && (
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors?.email?.message}>
              <FormLabel>Email</FormLabel>
              <Input {...register("email")} placeholder="Email" />
              {errors?.email && (
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors?.id_number?.message}>
              <FormLabel>ID Number (NRIC)</FormLabel>
              <Input
                maxLength={9}
                {...register("id_number")}
                placeholder="ID Number (NRIC)"
              />
              {errors?.id_number && (
                <FormErrorMessage>
                  {errors?.id_number?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors?.post_code?.message}>
              <FormLabel>Postal Code</FormLabel>
              <Input {...register("post_code")} placeholder="Postal Code" />
              {errors?.post_code && (
                <FormErrorMessage>
                  {errors?.post_code?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors?.unit_number?.message}>
              <FormLabel>Unit Number</FormLabel>
              <Input {...register("unit_number")} placeholder="Unit Number" />
              {errors?.unit_number && (
                <FormErrorMessage>
                  {errors?.unit_number?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors?.address?.message}>
              <FormLabel>Address</FormLabel>
              <Textarea {...register("address")} placeholder="Address" />
              {errors?.address && (
                <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors?.remarks?.message}>
              <FormLabel>Remarks</FormLabel>
              <Textarea {...register("remarks")} placeholder="Remarks" />
              {errors?.remarks && (
                <FormErrorMessage>{errors?.remarks?.message}</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
          <Stack mt={4} direction="row" justifyContent="space-between">
            <Button
              onClick={onClear}
              colorScheme="red"
              size="md"
              variant="outline"
            >
              Reset
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              colorScheme="blue"
              size="md"
              spinnerPlacement="start"
              loadingText="Loading..."
            >
              Donate
            </Button>
          </Stack>
        </Box>
      </form>
    </>
  );
}
