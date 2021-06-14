import { useEffect, useRef } from "react";
import styled from "@emotion/styled";

import AddDateInput from "./AddDateInput";

import { CgClose, FaPlus } from "../assets";
import { SmallStepDatesType } from "../../utils/constants/smallSteps";
import { useToggle } from "../../utils/hooks";

type Props = {
  dates: SmallStepDatesType[];
};

const AddDate = ({ dates }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [toggleDate, onClickToggleDate] = useToggle(false);

  useEffect(() => {
    if (toggleDate && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggleDate]);

  return (
    <AddDateWrap>
      {toggleDate && <AddDateInput dates={dates} />}
      <div className="flex-center">
        {toggleDate ? (
          <ToggleButton
            className="add-date-clicked"
            onClick={onClickToggleDate}
          >
            <CgClose />
            <span>날짜 추가 취소하기</span>
          </ToggleButton>
        ) : (
          <ToggleButton
            className="add-date-not-clicked"
            onClick={onClickToggleDate}
          >
            <FaPlus />
            <span>날짜 추가하기</span>
          </ToggleButton>
        )}
      </div>
    </AddDateWrap>
  );
};

const AddDateWrap = styled.div`
  margin-top: 12px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
`;

const ToggleButton = styled.button`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 8px;
  padding: 4px 12px;
  border: 0;
  border-radius: 4px;
  background-color: transparent;
  color: #5e6c84;
  cursor: pointer;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
  > span {
    width: auto;
    margin-left: 12px;
  }
`;

export default AddDate;
