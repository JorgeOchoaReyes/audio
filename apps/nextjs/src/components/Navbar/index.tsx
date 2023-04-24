import React from "react";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { AcmeLogo } from "../Logo";

type IVariants = "static" | "floating" | "sticky";

export default function App() {
  const [variant] = React.useState<IVariants>("sticky");

  return (
    <Navbar variant={variant}>
      <Navbar.Brand>
        <AcmeLogo />
        <Text b color="inherit" hideIn="xs">
          NZQR
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="">Speak!</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="sign-in">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="sign-up">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
