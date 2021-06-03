import styled from "@emotion/styled";

import { PlannerTable, PlannerHead } from "../components";

const PlannerPage = () => {
  return (
    <Wrap>
      <PlannerHead />
      <PlannerTable />
    </Wrap>
  );
};

export const Wrap = styled.div`
  width: 1460px;
  margin: 120px auto;
  padding: 0 30px;
`;

export default PlannerPage;
