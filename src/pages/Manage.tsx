import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { AddDate, Dates, DateHead } from "../components";
import { useSmallSteps } from "../utils/hooks";

export const Manage = () => {
  const { dates, setSmallSteps, removeSmallStepDate } = useSmallSteps();
  const [removeDates, setRemoveDates] = useState<string[]>([]);

  const toggleToRemoveDates = (date: string) => {
    const aIdx = removeDates.findIndex((_date) => _date === date);
    const copy = [...removeDates];

    aIdx === -1 ? copy.push(date) : copy.splice(aIdx, 1);
    setRemoveDates(copy);
  };

  const onClickDeleteByBatch = useCallback(() => {
    if (!window.confirm(`${removeDates.length}개를 삭제하시겠습니까?`)) return;

    removeSmallStepDate(removeDates);
    setRemoveDates([]);
  }, [removeDates]);

  useEffect(() => {
    setSmallSteps([]);
  }, []);

  return (
    <ManageWrap>
      <ul>
        <DateHead
          removeDates={removeDates}
          onClickDeleteByBatch={onClickDeleteByBatch}
        />
        <Dates
          dates={dates}
          removeDates={removeDates}
          toggleToRemoveDates={toggleToRemoveDates}
        />
      </ul>
      <AddDate dates={dates} />
    </ManageWrap>
  );
};

const ManageWrap = styled.main`
  max-width: 500px;
  margin: 40px auto;
  padding: 0 24px;
  > ul {
    height: 600px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-track {
      background: white;
    }
    ::-webkit-scrollbar-thumb {
      background: #d2d2d2;
    }
  }
`;

export default Manage;
