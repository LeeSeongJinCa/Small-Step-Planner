import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import styled from "@emotion/styled";

import { PlannerTable, PlannerHead } from "../components";
import { useSmallSteps, useToggle } from "../utils/hooks";

const defaultValue = localStorage.getItem("isIncludeWeekend")
  ? !!+(localStorage.getItem("isIncludeWeekend") as string)
  : false;

const PlannerPage = () => {
  const history = useHistory();
  const { date } = useParams<{ date: string }>();
  const { dates, setSmallSteps } = useSmallSteps();
  const [isIncludeWeekend, onToggleWeekend] = useToggle(defaultValue);

  useEffect(() => {
    const target = dates.find(({ date: _date }) => _date === date);

    if (isNaN(+new Date(date)) || !target) {
      history.push("/");
    }

    if (target) setSmallSteps(target.smallSteps);
  }, []);

  useEffect(() => {
    localStorage.setItem("isIncludeWeekend", `${isIncludeWeekend ? 1 : 0}`);
  }, [isIncludeWeekend]);

  return (
    <Wrap>
      <PlannerHead
        date={date}
        isIncludeWeekend={isIncludeWeekend}
        onToggleWeekend={onToggleWeekend}
      />
      <PlannerTable isIncludeWeekend={isIncludeWeekend} />
    </Wrap>
  );
};

export const Wrap = styled.main`
  width: 1460px;
  margin: 80px auto;
  padding: 0 40px;
  color: #192029;
  @media screen and (max-width: 1460px) {
    width: 1240px;
  }
  @media screen and (max-width: 1240px) {
    width: 1020px;
  }
`;

export default PlannerPage;
