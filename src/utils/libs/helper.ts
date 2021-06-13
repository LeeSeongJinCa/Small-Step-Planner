import {
  allSmallSteps,
  AllSmallStepType,
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

class AllSmallStepHelper {
  constructor() {
    const local = this.getLocalAllSmallStep();

    if (local === null || local.length === 0) {
      localStorage.setItem("allSmallStep", JSON.stringify(allSmallSteps));
    }
  }

  get getAllSmallStep(): AllSmallStepType[] {
    return JSON.parse(localStorage.getItem("allSmallStep") as string);
  }

  set setAllSmallStep(smallSteps: AllSmallStepType[]) {
    localStorage.setItem("allSmallStep", JSON.stringify(smallSteps));
  }

  getLocalAllSmallStep(): AllSmallStepType[] {
    return JSON.parse(localStorage.getItem("allSmallStep") as string);
  }

  // addAllSmallStep(newSmallStep: SmallStepType) {}

  // deleteAllSmallStep(keyword: string, smallStep: string) {}
}

export const smallStepHelper = new SmallStepHelper();

export const allSmallStepHelper = new AllSmallStepHelper();
