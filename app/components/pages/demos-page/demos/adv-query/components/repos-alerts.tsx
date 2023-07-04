"use client";

import { Alert } from "antd";

interface AlertsProps {
  status: string;
  errorMessage: string;
}

export default function Alerts({ status, errorMessage }: AlertsProps) {
  if (status === "error") {
    return <Alert data-testid="repos-error" type="error" message="Error:" description={errorMessage} />;
  }

  if (status === "loading") {
    return <Alert data-testid="repos-loading" type="info" message="Loading..." />;
  }
}
