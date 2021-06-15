import { KeyboardEvent, useCallback, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "@emotion/styled";

import { AiOutlineEnter } from "../assets";
import { SmallStepDatesType } from "../../utils/constants/smallSteps";
import { getLocalDateUntilMonth } from "../../utils/functions/getLocalDate";
import { useInput } from "../../utils/hooks";
import { smallStepDatesState } from "../../utils/libs/atoms";
import { smallStepDatesHelper } from "../../utils/libs/helper";

type Props = {
  dates: SmallStepDatesType[];
};

const AddDateInput = ({ dates }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [date, onChangeDate, , setDate] = useInput();
  const setSmallStepDates = useSetRecoilState(smallStepDatesState);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && makeNewDate(),
    [date, dates]
  );

  const makeNewDate = () => {
    const d = new Date(date);
    const dateReg = /\d\d\d\d-\d\d/;
    const localDate = getLocalDateUntilMonth(d);

    d.setHours(0);

    if (
      d.toString() === "Invalid Date" ||
      !date.includes("-") ||
      !dateReg.test(date)
    ) {
      alert(`[yyyy-mm] 형식으로 입력해주세요.`);
      return;
    }
    if (dates.some(({ date }) => date === localDate)) {
      alert("이미 존재하는 날짜입니다.");
      return;
    }

    const copyDates = [...dates];
    const newDate: SmallStepDatesType = {
      date: localDate,
      smallSteps: [],
    };

    copyDates.push(newDate);
    copyDates.sort((a, b) => (a.date > b.date ? 1 : -1));
    setSmallStepDates(copyDates);
    smallStepDatesHelper.setSmallStepDates = copyDates;
    setDate("");
  };

  return (
    <AddDateInputWrap>
      <span>
        <span>날짜</span>
        <br />
        <input
          type="text"
          ref={inputRef}
          placeholder="yyyy-mm"
          value={date}
          onChange={onChangeDate}
          onKeyPress={onKeyPress}
        />
        <button onClick={makeNewDate}>추가</button>
        <br />
        <span className="flex-center">
          <AiOutlineEnter /> 엔터키로 추가하기
        </span>
      </span>
    </AddDateInputWrap>
  );
};

const AddDateInputWrap = styled.div`
  padding: 12px;
  text-align: center;
  input {
    margin: 6px 2px;
    padding: 8px 4px;
    border: 0;
    border-radius: 3px;
    outline: none;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 1px 3px rgb(9 30 66 / 25%);
  }
  button {
    margin: 6px 2px;
    padding: 8px;
    border: 0;
    border-radius: 3px;
    outline: none;
    text-align: center;
    background-color: #3080f5;
    color: white;
    box-shadow: 0 1px 3px rgb(9 30 66 / 25%);
    cursor: pointer;
  }
  svg {
    width: 16px;
    height: 16px;
  }
  > span > span {
    font-size: 12px;
    &:last-of-type {
      color: #a7a7a7;
      > svg {
        margin-right: 4px;
      }
    }
  }
`;

export default AddDateInput;
