import { BiAddToQueue } from "react-icons/bi";
import styled from "@emotion/styled";

import useToggle from "../../utils/hooks/useToggle";
import useInput from "../../utils/hooks/useInput";
import useSmallSteps from "../../utils/hooks/useSmallSteps";

const AddSmallStep = () => {
  const [modal, onToggleModal] = useToggle();
  const [keyword, onChangeKeyword, , setKeyword] = useInput();
  const [smallStep, onChangeSmallStep, , setSmallStep] = useInput();
  const { addSmallStep, steps } = useSmallSteps();

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
  };

  return (
    <>
      <AddButton onClick={onToggleModal}>
        <BiAddToQueue title="add small step" />
        <span>추가</span>
      </AddButton>
      {modal && (
        <AddInputWrap>
          <Input
            type="text"
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
          <Button onClick={onClickComplete}>완료</Button>
        </AddInputWrap>
      )}
    </>
  );
};

const AddButton = styled.div`
  position: fixed;
  left: 24px;
  top: 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 62px;
  height: 62px;
  padding: 2px;
  border: 0;
  border-radius: 50%;
  background-color: #353535;
  color: white;
  box-shadow: 0 0 5px #e6e6e6;
  transition: box-shadow 0.3s;
  user-select: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px #888888;
  }
  > svg {
    width: 24px;
    height: 24px;
  }
  > span {
    font-size: 14px;
    margin-top: 4px;
  }
`;

const AddInputWrap = styled.div`
  position: fixed;
  top: 100px;
  left: 24px;
  display: flex;
  flex-direction: column;
  width: 140px;
  z-index: 1;
  animation: fadeAppear 0.5s cubic-bezier(0.45, 0.55, 0.55, 1.45);
  @keyframes fadeAppear {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Input = styled.input`
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
`;

export default AddSmallStep;
