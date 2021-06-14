import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import produce from "immer";

import { SmallStepDatesType, SmallStepType } from "../constants/smallSteps";
import { smallStepDatesState, smallStepState } from "../libs/atoms";
import { smallStepHelper, smallStepDatesHelper } from "../libs/helper";

type ToggleArgs = {
  keyword: string;
  smallStep: string;
  checked: boolean;
  localDate: string;
};

const useSmallSteps = () => {
  const { date } = useParams<{ date: string }>();
  const [dates, setDates] = useRecoilState(smallStepDatesState);
  const [steps, setSteps] = useRecoilState(smallStepState);

  const setSmallSteps = useCallback((steps: SmallStepType[]) => {
    setSteps(steps);
    smallStepHelper.setSmallSteps = steps;
  }, []);

  const addSmallStep = useCallback((keyword: string, smallStep: string) => {
    const newSmallStep: SmallStepType = {
      keyword,
      smallStep,
      checkedList: [],
    };

    setSteps((prev) => [...prev, newSmallStep]);
    smallStepHelper.addSmallStep(newSmallStep);
  }, []);

  const removeSmallStep = useCallback(
    (keyword: string, smallStep: string) => {
      const removedSteps = steps.filter(
        (step) => step.keyword !== keyword && step.smallStep !== smallStep
      );

      setSteps(removedSteps);
      smallStepHelper.setSmallSteps = removedSteps;
    },
    [steps]
  );

  const toggleCheckbox = useCallback(
    (args: ToggleArgs) => {
      const { keyword, smallStep, checked, localDate } = args;
      const newSteps = produce(steps, (state) => {
        const smallStepIdx = state.findIndex(
          (step) => step.keyword === keyword && step.smallStep === smallStep
        );

        if (smallStepIdx === -1) throw Error(`Cannot found a small step`);

        const checkedList = state[smallStepIdx].checkedList;

        if (checked) {
          checkedList.push(localDate);
        } else {
          const dateIdx = checkedList.findIndex((_) => _ === localDate);

          if (dateIdx === -1) throw Error(`Cannot found a date`);

          checkedList.splice(dateIdx, 1);
        }
      });

      setSteps(newSteps);
      smallStepHelper.setSmallSteps = newSteps;
    },
    [steps]
  );

  const addSmallStepDate = useCallback(
    (newDate: SmallStepDatesType) => {
      const addedDates = produce(dates, (draft) => {
        draft.push(newDate);
      });

      setDates(addedDates);
      smallStepDatesHelper.setSmallStepDates = addedDates;
    },
    [dates]
  );

  const removeSmallStepDate = useCallback(
    (removeDates: string[]) => {
      const removedDates = produce(dates, (draft) => {
        removeDates.forEach((date) => {
          const idx = draft.findIndex(({ date: _date }) => _date === date);

          if (idx === -1) throw Error("Cannot found a date");

          draft.splice(idx, 1);
        });
      });

      setDates(removedDates);
      smallStepDatesHelper.setSmallStepDates = removedDates;
    },
    [dates]
  );

  const saveDatesInStorage = useCallback(() => {
    if (!date) return;

    const newDates = produce(dates, (state) => {
      const idx = state.findIndex(({ date: _date }) => _date === date);

      if (idx === -1) {
        return;
        throw Error(`Cannot found a date`);
      }

      state[idx].smallSteps = steps;
    });

    setDates(newDates);
    smallStepDatesHelper.setSmallStepDates = newDates;
  }, [date, steps]);

  useEffect(() => {
    setSteps(smallStepHelper.getSmallSteps);
  }, []);

  useEffect(() => {
    saveDatesInStorage();
  }, [steps]);

  return {
    dates,
    steps,
    setSmallSteps,
    addSmallStep,
    removeSmallStep,
    toggleCheckbox,
    addSmallStepDate,
    removeSmallStepDate,
  } as const;
};

export default useSmallSteps;
