import { ChangeEvent, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";

import * as TableRow from "./TableRow";
import AddSmallStep from "./AddSmallStep";

import { SmallStepper, SmallStepType } from "../../utils/constants/smallSteps";
import getLocalDate from "../../utils/functions/getLocalDate";
import { smallStepState } from "../../utils/libs/atoms";

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth() + 1;
const d = new Date(y, m, 0).getDate();

export const PlannerTable = () => {
  const [smallSteps, setSmallSteps] = useRecoilState(smallStepState);

  useEffect(() => {
    setSmallSteps(SmallStepper.getSmallSteps);
  }, []);

  return (
    <Wrap>
      <ul>
        <li className="head">
          <TableRow.Keyword>Keyword</TableRow.Keyword>
          <TableRow.SmallStep>Small Step</TableRow.SmallStep>
          {Array.from(Array(d).keys()).map((i) => (
            <span
              key={getLocalDate(new Date(`${y}-${m}-${i + 1}`))}
              className="item date"
            >
              {i + 1}
            </span>
          ))}
        </li>
        {smallSteps.map(({ keyword, smallStep, checkedList }, idx) => {
          const onClickDelete = () => {
            if (!window.confirm("정말 삭제하시겠습니까?")) return;

            const copy = [...smallSteps];

            copy.splice(idx, 1);
            setSmallSteps(copy);
            SmallStepper.setSmallSteps = copy;
          };

          return (
            <TableRow.TableRow key={`${keyword}-${smallStep}`}>
              <TableRow.Delete onClick={onClickDelete} />
              <TableRow.Keyword>{keyword}</TableRow.Keyword>
              <TableRow.SmallStep>{smallStep}</TableRow.SmallStep>
              {Array.from(Array(d).keys()).map((i) => {
                const localDate = getLocalDate(new Date(`${y}-${m}-${i + 1}`));

                const onChange = (e: ChangeEvent<HTMLInputElement>) => {
                  const checked = e.currentTarget.checked;
                  const smallSteps: SmallStepType[] = JSON.parse(
                    localStorage.getItem("smallSteps") as string
                  );
                  const list = smallSteps[idx].checkedList;

                  if (checked) {
                    list.push(localDate);
                  } else {
                    const targetIdx = list.findIndex((_) => _ === localDate);
                    list.splice(targetIdx, 1);
                  }

                  setSmallSteps(smallSteps);
                  SmallStepper.setSmallSteps = smallSteps;
                };

                return (
                  <TableRow.DateCheckbox
                    key={localDate}
                    checkedList={checkedList}
                    localDate={localDate}
                    onChange={onChange}
                  />
                );
              })}
            </TableRow.TableRow>
          );
        })}
        <AddSmallStep />
      </ul>
    </Wrap>
  );
};

const Wrap = styled.main`
  > ul > li {
    position: relative;
    display: flex;
    justify-content: center;
    flex: 1 1 0;
    &.head {
      background-color: #999999;
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 4px;
      border: 1px solid black;
      text-align: center;
      &.keyword {
        min-width: 80px;
      }
      &.small-step {
        min-width: 120px;
        word-break: keep-all;
      }
      &.date {
        min-width: 40px;
      }
      input[type="checkbox"] {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
`;
