export const voteQuestions = [
  {
    id: 1,
    title: "Issuance",
    question: "What percentage of the issuance should be minted this week?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    issuance: {
      title: "Last week's Issuance",
      amount: "50%",
    },
    slider: {
      min: 0,
      max: 100,
      default: 50,
      unit: "%",
    },
    manualInput: true,
  },
  {
    id: 2,
    title: "Lift Cash Mint Fee",
    question: "What should the mint fee be for Lift Cash this week?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    issuance: {
      title: "Current Lift Cash Mint Fee",
      amount: "18%",
    },
    slider: {
      min: 6,
      max: 30,
      default: 18,
      unit: "%",
    },
    manualInput: true,
  },
  {
    id: 3,
    title: "ICP Mint Fee",
    question:"what should the mint fee be for ICP this week?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    issuance: {
      title: "Current ICP Mint Fee",
      amount: "18%",
    },
    slider: {
      min: 6,
      max: 30,
      default: 18,
      unit: "%",
    },
    manualInput: true,
  },
  {
    id: 4,
    title: "Locking Threshold",
    question:"What should the locking threshold be for this week?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    issuance: {
      title: "Current Locking Threshold",
      amount: 0.02835,
    },
    slider: {
      min: 0.0167,
      max: 0.04,
      default: 0.02835,
      unit: "USD",
    },
    manualInput: true,
  },
];
