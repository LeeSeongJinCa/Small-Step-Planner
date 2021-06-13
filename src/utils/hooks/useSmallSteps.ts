import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import produce from "immer";

import { SmallStepType } from "../constants/smallSteps";
import { allSmallStepsState, smallStepState } from "../libs/atoms";
import { smallStepHelper, allSmallStepHelper } from "../libs/helper";

type ToggleArgs = {
  keyword: string;
  smallStep: string;
  checked: boolean;
  localDate: string;
};

const useSmallSteps = () => {
  const { date } = useParams<{ date: string }>();
  const [all, setAll] = useRecoilState(allSmallStepsState);
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

  const removeSmallStep = useCallback((keyword: string, smallStep: string) => {
    const removedSteps = steps.filter(
      (step) => step.keyword !== keyword && step.smallStep !== smallStep
    );

    setSteps(removedSteps);
    smallStepHelper.setSmallSteps = removedSteps;
  }, []);

  const toggleCheckbox = useCallback(
    (args: ToggleArgs) => {
      const { keyword, smallStep, checked, localDate } = args;
      const newSmallStep = [...steps];
      const newSteps = produce(newSmallStep, (state) => {
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

  const saveAllInStorage = () => {
    if (!date) return;

    const newAlls = produce(all, (state) => {
      const idx = state.findIndex(({ date: _date }) => _date === date);

      if (idx === -1) throw Error(`Cannot found a date`);

      state[idx].smallSteps = steps;
    });

    setAll(newAlls);
    allSmallStepHelper.setAllSmallStep = newAlls;
  };

  useEffect(() => {
    setSteps(smallStepHelper.getSmallSteps);
  }, []);

  useEffect(() => {
    saveAllInStorage();
  }, [steps]);

  return {
    all,
    steps,
    setSmallSteps,
    addSmallStep,
    removeSmallStep,
    toggleCheckbox,
  } as const;
};

export default useSmallSteps;
