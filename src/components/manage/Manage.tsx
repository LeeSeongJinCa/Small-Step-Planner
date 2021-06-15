import { useState } from "react";
import styled from "@emotion/styled";

import AddDate from "./AddDate";
import Dates from "./Dates";

import { AiFillDelete, AiFillCheckSquare, CgCalendarDates } from "../assets";
import { useSmallSteps } from "../../utils/hooks";

export const Manage = () => {
  const { dates, removeSmallStepDate } = useSmallSteps();
  const [removeDates, setRemoveDates] = useState<string[]>([]);

  const toggleToRemoveDates = (date: string) => {
    const aIdx = removeDates.findIndex((_date) => _date === date);
    const copy = [...removeDates];

    aIdx === -1 ? copy.push(date) : copy.splice(aIdx, 1);
    setRemoveDates(copy);
  };

  const onClickDeleteByBatch = () => {
    if (!window.confirm(`${removeDates.length}개를 삭제하시겠습니까?`)) return;

    removeSmallStepDate(removeDates);
    setRemoveDates([]);
  };

  return (
    <ManageWrap>
      <ul>
        <li className="flex-center">
          {removeDates.length > 0 && (
            <AiFillDelete onClick={onClickDeleteByBatch} />
          )}
          <span className="flex-center">
            <CgCalendarDates /> 날짜
          </span>
          <span className="flex-center">
            <AiFillCheckSquare /> 개수
          </span>
        </li>
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
  margin: 80px auto;
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
    > li:first-of-type {
      position: sticky;
      top: 0;
      left: 0;
      padding: 12px;
      border-bottom: 1px solid #d2d2d2;
      background-color: white;
      z-index: 1;
      font-weight: bold;
      span {
        width: 50%;
        text-align: center;
        > svg {
          margin-right: 4px;
        }
      }
      > svg {
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translate(0, -50%);
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
  }
`;

export default Manage;
