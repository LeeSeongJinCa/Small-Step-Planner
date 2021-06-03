import { useRecoilValue } from "recoil";

import { allSmallStepsState } from "../../utils/libs/atoms";

export const Manage = () => {
  const allSmallSteps = useRecoilValue(allSmallStepsState);

  return (
    <ul>
      {allSmallSteps.map(({ date, smallSteps }) => {
        const onClick = () => {
          console.log(smallSteps);
        };
        return (
          <li key={date} onClick={onClick}>
            <p>date: {date}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Manage;
