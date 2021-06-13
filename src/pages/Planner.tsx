import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import styled from "@emotion/styled";

import { PlannerTable, PlannerHead } from "../components";
import { getLocalDateUntilMonth } from "../utils/functions/getLocalDate";

const PlannerPage = () => {
  const history = useHistory();
  const { date } = useParams<{ date: string }>();

  useEffect(() => {
    if (isNaN(+new Date(date))) {
      history.push(getLocalDateUntilMonth(new Date()));
    }
  }, []);

  return (
    <Wrap>
      <PlannerHead date={date} />
      <PlannerTable />
    </Wrap>
  );
};

export const Wrap = styled.div`
  width: 1460px;
  margin: 120px auto;
  padding: 0 40px;
`;

export default PlannerPage;
