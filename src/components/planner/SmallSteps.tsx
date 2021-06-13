import { ChangeEvent, useCallback, useState } from "react";

import * as TableRow from "./TableRow";

import useSmallSteps from "../../utils/hooks/useSmallSteps";
import { PlannerDragType } from "../../utils/libs/types";
import {
  getLastDate,
  getLocalDateKey,
} from "../../utils/functions/getLocalDate";
import { SmallStepType } from "../../utils/constants/smallSteps";

type Props = SmallStepType & {};

const SmallSteps = ({ keyword, smallStep, checkedList }: Props) => {
  const { removeSmallStep, toggleCheckbox } = useSmallSteps();
  const [enterId, setEnterId] = useState<string>("");

  const id = `${keyword}-${smallStep}`;
  const className = `step`;

  const onClickDelete = useCallback(() => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    removeSmallStep(keyword, smallStep);
  }, []);

  const onDragStart = useCallback((e: PlannerDragType) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
  }, []);

  const onDragEnter = useCallback(() => {
    setEnterId(id);
  }, []);

  const onDragEnd = useCallback((e: PlannerDragType) => {
    setEnterId("");
  }, []);

  return (
    <TableRow.TableRow
      key={id}
      attributes={{
        draggable: true,
        id,
        className,
        onDragStart,
        onDragEnter,
        onDragEnd,
      }}
    >
      <div onClick={onClickDelete}>
        <TableRow.Delete />
      </div>
      <TableRow.Keyword>{keyword}</TableRow.Keyword>
      <TableRow.SmallStep>{smallStep}</TableRow.SmallStep>
      {Array.from(Array(getLastDate()).keys()).map((i) => {
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
