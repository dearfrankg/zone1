"use client";

import { useRouter } from "next/navigation";

const MyComponent = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/users");
  };

  return (
    <div>
      <h1>My Component</h1>
      <button onClick={handleButtonClick}>Go to another route</button>
    </div>
  );
};

export default MyComponent;
