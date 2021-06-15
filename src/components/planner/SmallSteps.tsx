import { ChangeEvent, useCallback } from "react";
import { useParams } from "react-router-dom";

import * as TableRow from "./TableRow";

import { useSmallSteps } from "../../utils/hooks";
import { PlannerDragType } from "../../utils/libs/types";
import {
  getLastDate,
  getLocalDateKey,
} from "../../utils/functions/getLocalDate";
import { SmallStepType } from "../../utils/constants/smallSteps";

type Props = SmallStepType & { isIncludeWeekend: boolean };

const SmallSteps = ({
  keyword,
  smallStep,
  checkedList,
  isIncludeWeekend,
}: Props) => {
  const { date } = useParams<{ date: string }>();
  const { removeSmallStep, toggleCheckbox } = useSmallSteps();

  const id = `${keyword}-${smallStep}`;
  const className = `step`;

  const onClickDelete = useCallback(() => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    removeSmallStep(keyword, smallStep);
  }, []);

  const onDragStart = useCallback((e: PlannerDragType) => {
    e.currentTarget.setAttribute("data-grab", "grab");
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
  }, []);

  const onDragEnd = useCallback((e: PlannerDragType) => {
    e.currentTarget.setAttribute("data-grab", "");
  }, []);

  return (
    <TableRow.TableRow
      key={id}
      attributes={{
        draggable: true,
        id,
        className,
        onDragStart,
        onDragEnd,
      }}
    >
      <div onClick={onClickDelete}>
        <TableRow.Delete />
      </div>
      <TableRow.Keyword>{keyword}</TableRow.Keyword>
      <TableRow.SmallStep>{smallStep}</TableRow.SmallStep>
      {Array.from(Array(getLastDate()).keys()).map((i) => {
        const isWeekend = new Date(`${date}-${i + 1}`).getDay() % 6 == 0;

        if (isIncludeWeekend && isWeekend) return null;

        const localDate = getLocalDateKey(i);

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
          const checked = e.currentTarget.checked;
          toggleCheckbox({ keyword, smallStep, checked, localDate });
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
};

export default SmallSteps;
