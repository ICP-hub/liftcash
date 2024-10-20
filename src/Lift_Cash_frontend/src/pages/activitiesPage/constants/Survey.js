export const survey = [
  {
    id: 1,
    title: "Wider Crypto Economy Sentiment",
    description:
      "Do you feel the Bitcoin (BTC) and wider crypto market is growing (bull market), shrinking (bear market), or neither (going sideways)?",
    type: "radiobutton",
    options: [
      { label: "Growing (bull market)", value: "growing" },
      { label: "Shrinking (bear market)", value: "shrinking" },
      { label: "Neither (going sideways)", value: "neither" },
    ],
  },
  {
    id: 2,
    title: "Crypto Market Change of Direction",
    description:
      "How long will the Bitcoin and crypto market last before it changes direction?",
    type: "slider",
    range: {
      min: 1,
      max: 24,
      current: 12,
    },
  },
  {
    id: 3,
    title: "Economy Sentiment",
    description:
      "Do you feel the Freeos economy is growing (bull market), shrinking (bear market), or neither (going sideways)?",
    type: "radiobutton",
    options: [
      { label: "Growing (bull market)", value: "growing" },
      { label: "Shrinking (bear market)", value: "shrinking" },
      { label: "Neither (going sideways)", value: "neither" },
    ],
  },
  {
    id: 4,
    title: "Market Change of Direction",
    description:
      "How long will the above Freeos market last before it changes direction?",
    type: "slider",
    range: {
      min: 1,
      max: 24,
      current: 12,
    },
  },
  {
    id: 5,
    title: "Priorities for Voting",
    description:
      "Select your top three priorities for this week's vote from the following economic tools.",
    type: "dropdown",
    options: [
      "Growing the participants",
      "Stabilising the price",
      "Raising the Locking Threshold",
    ],
    selected_priorities: [
      "Select Priority 1",
      "Select Priority 2",
      "Select Priority 3",
    ],
  },
];
