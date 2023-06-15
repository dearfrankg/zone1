import { useState, useRef, useEffect } from "react";
import { Button, Alert } from "antd";

export default function React18Batching() {
  const [a, setA] = useState("a");
  const [b, setB] = useState("b");
  const [c, setC] = useState("c");
  const [d, setD] = useState("d");

  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  const handleSetState = () => {
    setA("a updated");
    setB("b updated");
    setC("c updated");
    setD("d updated");
  };

  const handleReset = () => {
    setA("a");
    setB("b");
    setC("c");
    setD("d");
  };

  useEffect(() => {
    if (renderCounter.current === 3) {
      setA("a updated with useEffect");
      setB("b updated with useEffect");
      setC("c updated with useEffect");
      setD("d updated with useEffect");
    }
  }, [renderCounter.current]);

  return (
    <div className="space-y-4">
      <div className="text-xl font-medium">
        Number of renders: {renderCounter.current}
      </div>

      <div className="text-xl font-medium">State List</div>

      <ul>
        {[a, b, c, d].map((item: any, i: number) => (
          <li key={i} className="list-disc">
            {item}
          </li>
        ))}
      </ul>

      <Button onClick={handleSetState} className="block">
        Set state on four variables
      </Button>

      <Button onClick={handleReset}>Reset state on four variables</Button>

      <Alert
        message="useEffect with trigger after 3 renders, causing a fourth render"
        type="warning"
        showIcon
      />

      <Alert
        message="Renders only happen when state changes"
        type="info"
        showIcon
      />
    </div>
  );
}
