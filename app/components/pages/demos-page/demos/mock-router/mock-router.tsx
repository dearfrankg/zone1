"use client";

import { useRouter } from "next/navigation";
import { Button } from "@components/index";

const MockRouter = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/demos");
  };

  return <Button onClick={handleButtonClick}>Go to another route</Button>;
};

export default MockRouter;
