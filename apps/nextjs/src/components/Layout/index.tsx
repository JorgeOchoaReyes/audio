import { Box } from "../Box";
import React from "react";
import Navbar from "../Navbar";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => (
  <>
    <Navbar />
    <Box
      css={{
        maxW: "100%",
      }}
    >
      {children}
    </Box>
  </>
);
