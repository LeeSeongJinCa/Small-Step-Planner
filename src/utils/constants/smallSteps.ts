export type SmallStepDatesType = {
  date: string;
  smallSteps: SmallStepType[];
};

export type SmallStepType = {
  keyword: string;
  smallStep: string;
  checkedList: string[];
};

const monthOfSixSmallSteps: SmallStepType[] = [
  {
    checkedList: ["2021-06-01", "2021-06-02", "2021-06-04"],
    keyword: "#마음 안정",
    smallStep: "점심시간 운동",
  },

  {
    checkedList: [
      "2021-06-01",
      "2021-06-02",
      "2021-06-03",
      "2021-06-08",
      "2021-06-09",
    ],
    keyword: "#마음 안정",
    smallStep: "저녁시간 운동",
  },

  {
    checkedList: [
      "2021-06-01",
      "2021-06-02",
      "2021-06-03",
      "2021-06-04",
      "2021-06-07",
      "2021-06-08",
      "2021-06-09",
    ],
    keyword: "#가족",
    smallStep: "가족 톡에 아침 인사",
  },

  {
    checkedList: [
      "2021-06-01",
      "2021-06-03",
      "2021-06-07",
      "2021-06-08",
      "2021-06-09",
    ],
    keyword: "#끈기",
    smallStep: "1일 1커밋",
  },

  {
    checkedList: [
      "2021-06-01",
      "2021-06-03",
      "2021-06-04",
      "2021-06-08",
      "2021-06-09",
    ],
    keyword: "#지식",
    smallStep: "책 읽기(아침)",
  },

  {
    checkedList: [
      "2021-06-01",
      "2021-06-02",
      "2021-06-03",
      "2021-06-04",
      "2021-06-07",
      "2021-06-08",
    ],
    keyword: "#공부",
    smallStep: "기술 블로그 읽기",
  },

  {
    checkedList: ["2021-06-01", "2021-06-02", "2021-06-05", "2021-06-08"],
    keyword: "#휴식",
    smallStep: "하루에 사진 한 장씩",
  },

  {
    checkedList: [
      "2021-06-01",
      "2021-06-02",
      "2021-06-03",
      "2021-06-04",
      "2021-06-07",
      "2021-06-08",
      "2021-06-09",
    ],
    keyword: "#예의",
    smallStep: "수업 시간 자지 않기",
  },

  {
    checkedList: ["2021-06-05", "2021-06-06", "2021-06-08"],
    keyword: "#건강",
    smallStep: "손톱 물어뜯지 않기",
  },

  {
    checkedList: [
      "2021-06-01",
      "2021-06-02",
      "2021-06-03",
      "2021-06-05",
      "2021-06-06",
      "2021-06-04",
      "2021-06-08",
      "2021-06-09",
    ],
    keyword: "#건강",
    smallStep: "하루 1L 물 마시기(2)",
  },

  {
    checkedList: [
      "2021-06-01",
      "2021-06-03",
      "2021-06-05",
      "2021-06-06",
      "2021-06-07",
      "2021-06-08",
      "2021-06-09",
    ],
    keyword: "#생각",
    smallStep: "자유주제로 5분 대화",
  },

  {
    checkedList: [
      "2021-06-01",
      "2021-06-02",
      "2021-06-03",
      "2021-06-06",
      "2021-06-07",
      "2021-06-08",
      "2021-06-09",
    ],
    keyword: "#정리",
    smallStep: "마인더 쓰기",
  },

  {
    checkedList: [
      "2021-06-01",
      "2021-06-02",
      "2021-06-03",
      "2021-06-07",
      "2021-06-08",
      "2021-06-09",
    ],
    keyword: "#음악",
    smallStep: "새로운 노래 듣기",
  },
];

export const smallStepDates: SmallStepDatesType[] = [
  {
    date: "2021-05",
    smallSteps: [],
  },
  {
    date: "2021-06",
    smallSteps: [...monthOfSixSmallSteps],
  },
];

export default monthOfSixSmallSteps;
