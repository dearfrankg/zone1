import { useQuery } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";

const MyComponent = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery("myData", fetchData);

  const handleButtonClick = () => {
    router.push("/another-route");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.message}</h1>
      <button onClick={handleButtonClick}>Go to another route</button>
    </div>
  );
};

const fetchData = async () => {
  const response = await axios.get("/api/data");
  return response.data;
};

export default MyComponent;
