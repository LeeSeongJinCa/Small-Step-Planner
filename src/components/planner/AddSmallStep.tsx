import { BiAddToQueue } from "react-icons/bi";
import { useSetRecoilState } from "recoil";
import styled from "@emotion/styled";

import { SmallStepper, SmallStepType } from "../../utils/constants/smallSteps";
import useToggle from "../../utils/hooks/useToggle";
import useInput from "../../utils/hooks/useInput";
import { smallStepState } from "../../utils/libs/atoms";

const AddSmallStep = () => {
  const [modal, onToggleModal] = useToggle();
  const [keyword, onChangeKeyword, , setKeyword] = useInput();
  const [smallStep, onChangeSmallStep, , setSmallStep] = useInput();
  const setSmallSteps = useSetRecoilState(smallStepState);

  const onClickComplete = () => {
    if (keyword.trim() === "" || smallStep.trim() === "") {
      return alert("키워드와 스몰 스텝을 입력해주세요.");
    }
    if (!keyword.startsWith("#")) {
      return alert("키워드는 # 으로 시작해야 합니다.");
    }

    const newSmallStep: SmallStepType = {
      keyword,
      smallStep,
      checkedList: [],
    };

    SmallStepper.addSmallStep(newSmallStep);
    setSmallSteps((prev) => [...prev, newSmallStep]);

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
          <input
            type="text"
            placeholder="keyword"
            value={keyword}
            onChange={onChangeKeyword}
          />
          <input
            type="text"
            placeholder="small step"
            value={smallStep}
            onChange={onChangeSmallStep}
          />
          <button onClick={onClickComplete}>완료</button>
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
  > input {
    margin: 2px 0;
    padding: 4px;
    border: 1px solid #b9b9b9;
    border-radius: 0;
  }
  > button {
    margin-top: 2px;
    padding: 4px;
    border: 1px solid #b9b9b9;
    background-color: white;
    color: #2b2b2b;
    cursor: pointer;
  }
`;

export default AddSmallStep;
