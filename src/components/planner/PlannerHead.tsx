import styled from "@emotion/styled";

type Props = {
  date: string;
  isIncludeWeekend: boolean;
  onToggleWeekend: () => void;
};

export const PlannerHead = ({
  date,
  isIncludeWeekend,
  onToggleWeekend,
}: Props) => {
  return (
    <Wrap>
      <div>
        <h2>Small Step Monthly Planner</h2>
        <div className="flex-center">
          <span>주말 포함</span>
          <ToggleWrap
            isIncludeWeekend={isIncludeWeekend}
            onClick={onToggleWeekend}
          />
        </div>
      </div>
      <h3>{date}</h3>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  > div {
    display: flex;
    > div {
      margin-left: 24px;
      > span {
        margin-right: 12px;
        font-size: 14px;
      }
    }
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 16px;
  }
`;

const ToggleWrap = styled.div<{ isIncludeWeekend: boolean }>`
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 16px;
  background-color: ${({ isIncludeWeekend }) =>
    isIncludeWeekend ? "#eaeaea" : "#9bea85"};
  transition: all 300ms cubic-bezier(0.5, 0.9, 0.5, 1);
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: ${({ isIncludeWeekend }) =>
      isIncludeWeekend ? "4px" : "calc(100% - 16px - 4px)"};
    transition: inherit;
    transform: translate(0, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
  }
`;
