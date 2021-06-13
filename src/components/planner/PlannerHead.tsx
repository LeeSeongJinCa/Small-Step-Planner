import styled from "@emotion/styled";

type Props = {
  date: string;
};

export const PlannerHead = ({ date }: Props) => {
  return (
    <Wrap>
      <h1>Small Step Monthly Planner</h1>
      <h2>{date}</h2>
    </Wrap>
  );
};

const Wrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  > h1 {
    font-size: 24px;
  }
  > h2 {
    font-size: 20px;
  }
`;
