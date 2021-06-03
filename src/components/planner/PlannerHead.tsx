import styled from "@emotion/styled";

export const PlannerHead = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth() + 1;

  return (
    <Wrap>
      <h1>Small Step Monthly Planner</h1>
      <h2>
        {y}-{`${m}`.padStart(2, "0")}
      </h2>
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
