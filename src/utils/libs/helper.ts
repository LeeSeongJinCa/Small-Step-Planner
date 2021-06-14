import produce from "immer";

import {
  smallStepDates,
  SmallStepDatesType,
  SmallStepType,
} from "../constants/smallSteps";

class SmallStepHelper {
  constructor() {
    const local = this.getLocalSmallSteps();

    if (local === null || local.length === 0) {
      localStorage.setItem("smallSteps", JSON.stringify([]));
    }
  }

  get getSmallSteps(): SmallStepType[] {
    return JSON.parse(localStorage.getItem("smallSteps") as string);
  }

  set setSmallSteps(smallSteps: SmallStepType[]) {
    localStorage.setItem("smallSteps", JSON.stringify(smallSteps));
  }

  getLocalSmallSteps(): SmallStepType[] {
    return JSON.parse(localStorage.getItem("smallSteps") as string);
  }

  addSmallStep(newSmallStep: SmallStepType) {
    const smallSteps = this.getLocalSmallSteps();

    smallSteps.push(newSmallStep);
    this.setSmallSteps = smallSteps;
  }

  deleteSmallStep(keyword: string, smallStep: string) {
    const localSmallSteps = this.getLocalSmallSteps();
    const targetIdx = localSmallSteps.findIndex(
      (step) => step.keyword === keyword && step.smallStep === smallStep
    );

    if (targetIdx === -1) throw Error(`Cannot found a small step`);

    localSmallSteps.splice(targetIdx, 1);
    this.setSmallSteps = localSmallSteps;
  }
}

class SmallStepDateHelper {
  constructor() {
    const local = this.getLocalSmallStepDate();

    if (local === null || local.length === 0) {
      localStorage.setItem("smallStepDates", JSON.stringify(smallStepDates));
    }
  }

  get getSmallStepDates(): SmallStepDatesType[] {
    return JSON.parse(localStorage.getItem("smallStepDates") as string);
  }

  set setSmallStepDates(newDates: SmallStepDatesType[]) {
    const sortedNewDates = produce(newDates, (draft) => {
      draft.sort((a, b) => (a.date > b.date ? 1 : -1));
    });

    localStorage.setItem("smallStepDates", JSON.stringify(sortedNewDates));
  }

  getLocalSmallStepDate(): SmallStepDatesType[] {
    return JSON.parse(localStorage.getItem("smallStepDates") as string);
  }
}

export const smallStepHelper = new SmallStepHelper();

export const smallStepDatesHelper = new SmallStepDateHelper();
