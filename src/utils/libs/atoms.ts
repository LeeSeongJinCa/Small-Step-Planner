import { atom } from "recoil";

import { smallStepDatesHelper, smallStepHelper } from "./helper";

import { SmallStepDatesType, SmallStepType } from "../constants/smallSteps";

export const smallStepState = atom<SmallStepType[]>({
  key: "SmallStepState",
  default: smallStepHelper.getSmallSteps,
});

export const smallStepDatesState = atom<SmallStepDatesType[]>({
  key: "smallStepDatesState",
  default: smallStepDatesHelper.getSmallStepDates,
});
