import React from "react";
import { Text } from "@nextui-org/react";

const Error: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center text-white">
      <Text>{error}</Text>
    </div>
  );
};

export default Error;
