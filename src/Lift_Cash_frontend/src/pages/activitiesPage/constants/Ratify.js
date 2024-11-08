export const voteData = {
  sections: [
    {
      title: "Mint Fee, paid in XUSDC",
      details: [
        { label: "Current Mint Fee, paid in XUSDC", value: "14.82%" },
        {
          label: "The Voted Mint Fee, paid in XUSDC",
          value: "13.48%",
          change: "down",
        },
      ],
    },
    {
      title: "Locking Threshold",
      details: [
        { label: "Current Locking Threshold", value: "0.036059 USD" },
        {
          label: "The Voted Locking Threshold",
          value: "0.03 USD",
          change: "down",
        },
      ],
    },
    {
      title: "Staking Reward",
      details: [
        { label: "Current Staking Reward", value: "5.50%" },
        {
          label: "The Voted Staking Reward",
          value: "6.00%",
          change: "up",
        },
      ],
    },
    {
      title: "Liquidity Provision Fee",
      details: [
        { label: "Current Liquidity Provision Fee", value: "0.10%" },
        {
          label: "The Voted Liquidity Provision Fee",
          value: "0.12%",
          change: "up",
        },
      ],
    },
  ],
  vote: {
    question: "Do you agree that this week's VOTE is appropriate today?",
    options: [
      { text: "Agree", action: "agree" },
      { text: "Disagree", action: "disagree" },
    ],
  },
  important_note: {
    text: "IMPORTANT: If the majority votes 'No', the next Claim will not process any POINTs for this iteration.",
  },
};
