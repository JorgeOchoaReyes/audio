import React from "react";
import { Loading } from "@nextui-org/react";

const LoadingProgress = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center text-white">
      <Loading color="primary" />
    </div>
  );
};

export default LoadingProgress;
