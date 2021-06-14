import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import styled from "@emotion/styled";

import { PlannerTable, PlannerHead } from "../components";
import { getLocalDateUntilMonth } from "../utils/functions/getLocalDate";
import { useSmallSteps } from "../utils/hooks";

const PlannerPage = () => {
  const history = useHistory();
  const { date } = useParams<{ date: string }>();
  const { dates, setSmallSteps } = useSmallSteps();

  useEffect(() => {
    const target = dates.find(({ date: _date }) => _date === date);

    if (isNaN(+new Date(date)) || !target) {
      history.push(getLocalDateUntilMonth(new Date()));
    }

    if (target) setSmallSteps(target.smallSteps);
  }, []);

  return (
    <Wrap>
      <PlannerHead date={date} />
      <PlannerTable />
    </Wrap>
  );
};

export const Wrap = styled.main`
  width: 1460px;
  margin: 120px auto;
  padding: 0 40px;
`;

export default PlannerPage;
