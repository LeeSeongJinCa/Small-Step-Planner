import { atom } from "recoil";

import { allSmallStepHelper, smallStepHelper } from "./helper";

import { AllSmallStepType, SmallStepType } from "../constants/smallSteps";

export const smallStepState = atom<SmallStepType[]>({
  key: "SmallStepState",
  default: smallStepHelper.getSmallSteps,
});

export const allSmallStepsState = atom<AllSmallStepType[]>({
  key: "allSmallStepsState",
  default: allSmallStepHelper.getAllSmallStep,
});
