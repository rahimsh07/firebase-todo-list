import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Image width={100} height={100} alt="Loading..." src="/loader.svg" />
    </div>
  );
};

export default Loader;
