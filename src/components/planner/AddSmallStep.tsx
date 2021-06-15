import { useRef, useEffect } from "react";
import styled from "@emotion/styled";

import { BiAddToQueue, GiCancel } from "../assets";
import { useToggle, useInput, useSmallSteps } from "../../utils/hooks";

const AddSmallStep = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [toggle, onToggle] = useToggle(false);
  const [keyword, onChangeKeyword, , setKeyword] = useInput();
  const [smallStep, onChangeSmallStep, , setSmallStep] = useInput();
  const { steps, addSmallStep } = useSmallSteps();

  const onClickComplete = () => {
    const isExist = steps.some(
      (step) => step.keyword === keyword && step.smallStep === smallStep
    );

    if (isExist) {
      return alert("동일한 스몰스탭이 존재합니다.");
    }
    if (keyword.trim() === "" || smallStep.trim() === "") {
      return alert("키워드와 스몰 스텝을 입력해주세요.");
    }
    if (!keyword.startsWith("#")) {
      return alert("키워드는 # 으로 시작해야 합니다.");
    }

    addSmallStep(keyword, smallStep);
    setKeyword("");
    setSmallStep("");
    onToggle();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggle]);

  return (
    <AddSmallStepWrap>
      <SlideWrap toggle={toggle}>
        <Input
          type="text"
          ref={inputRef}
          placeholder="keyword"
          value={keyword}
          onChange={onChangeKeyword}
        />
        <Input
          type="text"
          placeholder="small step"
          value={smallStep}
          onChange={onChangeSmallStep}
          onKeyPress={(e) => e.key === "Enter" && onClickComplete()}
        />
      </SlideWrap>
      <Button
        className="flex-center"
        onClick={toggle ? onClickComplete : onToggle}
      >
        <BiAddToQueue title="add small step" />
        <span>{toggle ? "완료" : "추가"}</span>
      </Button>
      {toggle && (
        <Button className="flex-center" onClick={onToggle}>
          <GiCancel />
          <span>취소</span>
        </Button>
      )}
    </AddSmallStepWrap>
  );
};

const AddSmallStepWrap = styled.li`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

const SlideWrap = styled.div<{ toggle: boolean }>`
  display: flex;
  width: ${({ toggle }) => (toggle ? "320px" : "0")};
  transform: scale(${({ toggle }) => (toggle ? "1" : "0")});
  transition: all 500ms;
`;

const Input = styled.input`
  width: 150px;
  margin: 0 4px;
  padding: 8px;
  border: 1px solid #bdbdbd;
  outline: none;
  &:not(:placeholder-shown) {
    border-color: #797979;
  }
  &:focus,
  &:focus-within {
    border-color: #79a4ff;
  }
  &:hover {
    border-color: #242424;
  }
`;

const Button = styled.button`
  position: relative;
  height: 100%;
  margin: 0 4px;
  padding: 8px;
  border: 0;
  border-radius: 4px;
  outline: none;
  background-color: #3e96ff;
  color: white;
  box-shadow: 0 2px 5px #d2d2d2;
  transition: 300ms;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    background-color: #0275ff;
  }
  > svg {
    margin-right: 4px;
  }
`;

export default AddSmallStep;
