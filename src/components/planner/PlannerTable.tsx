import { useCallback } from "react";
import { useParams } from "react-router-dom";

import * as TableRow from "./TableRow";
import AddSmallStep from "./AddSmallStep";
import SmallSteps from "./SmallSteps";

import {
  getLastDate,
  getLocalDateKey,
} from "../../utils/functions/getLocalDate";
import { useSmallSteps } from "../../utils/hooks";
import { PlannerDragType } from "../../utils/libs/types";

type Props = { isIncludeWeekend: boolean };

export const PlannerTable = ({ isIncludeWeekend }: Props) => {
  const { date } = useParams<{ date: string }>();
  const { steps, setSmallSteps } = useSmallSteps();

  const onDrop = useCallback(
    (e: PlannerDragType) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const path: Element[] = (e.nativeEvent as any).path;
      const tag = path.find((el) => el.classList.contains("step"));

      if (!tag) return;

      const splitId = id.split("-");
      const selectedIdx = steps.findIndex(
        ({ keyword, smallStep }) =>
          keyword === splitId[0] && smallStep === splitId[1]
      );

      const tagId = tag.getAttribute("id") as string;
      const splitTagId = tagId.split("-");
      const droppedIdx = steps.findIndex(
        ({ keyword, smallStep }) =>
          keyword === splitTagId[0] && smallStep === splitTagId[1]
      );

      if (selectedIdx === -1) throw Error(`Cannot found a selected small step`);
      if (droppedIdx === -1) throw Error(`Cannot found a dropped small step`);
      if (selectedIdx === droppedIdx) return;

      const getNewSmallSteps = () => {
        const newSmallSteps = [...steps];
        const isUp = selectedIdx < droppedIdx;
        const startIdx = isUp ? droppedIdx + 1 : droppedIdx;
        const endIdx = isUp ? selectedIdx : selectedIdx + 1;

        newSmallSteps.splice(startIdx, 0, newSmallSteps[selectedIdx]);
        newSmallSteps.splice(endIdx, 1);

        return newSmallSteps;
      };

      const newSmallSteps = getNewSmallSteps();

      setSmallSteps(newSmallSteps);
    },
    [steps]
  );

  return (
    <ul onDrop={onDrop}>
      <TableRow.TableItem className="head">
        <TableRow.Keyword>Keyword</TableRow.Keyword>
        <TableRow.SmallStep>Small Step</TableRow.SmallStep>
        {Array.from(Array(getLastDate()).keys()).map((i) => {
          const isWeekend = new Date(`${date}-${i + 1}`).getDay() % 6 === 0;

          if (isIncludeWeekend && isWeekend) return null;

          return (
            <span key={getLocalDateKey(i)} className="item date">
              {i + 1}
            </span>
          );
        })}
      </TableRow.TableItem>
      {steps.map((step) => (
        <SmallSteps
          key={`${step.keyword}-${step.smallStep}`}
          {...step}
          isIncludeWeekend={isIncludeWeekend}
        />
      ))}
      <AddSmallStep />
    </ul>
  );
};
