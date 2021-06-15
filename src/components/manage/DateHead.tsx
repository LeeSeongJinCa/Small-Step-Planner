import styled from "@emotion/styled";

import { AiFillDelete, AiFillCheckSquare, CgCalendarDates } from "../assets";

type Props = {
  removeDates: string[];
  onClickDeleteByBatch: () => void;
};

export const DateHead = ({ removeDates, onClickDeleteByBatch }: Props) => {
  return (
    <DateHeadWrap className="flex-center">
      {removeDates.length > 0 && (
        <AiFillDelete onClick={onClickDeleteByBatch} />
      )}
      <span className="flex-center">
        <CgCalendarDates /> 날짜
      </span>
      <span className="flex-center">
        <AiFillCheckSquare /> 개수
      </span>
    </DateHeadWrap>
  );
};

const DateHeadWrap = styled.li`
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
`;

export default DateHead;
