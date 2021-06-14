import { useEffect } from "react";

import { Manage } from "../components";
import { useSmallSteps } from "../utils/hooks";

const ManagePage = () => {
  const { setSmallSteps } = useSmallSteps();

  useEffect(() => {
    setSmallSteps([]);
  }, []);

  return <Manage />;
};

export default ManagePage;
