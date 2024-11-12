export const voteData = {

  questions: [
    {
      id: 1,
      question : "Issuance",
      label1 : "Current Issuance",
      label2 : "The Voted Issuance", 
    },
    {
      id: 2,
      question : "Lift Cash Mint Fee",
      label1 : "Current Lift Cash Mint Fee",
      label2 : "The Voted Lift Cash Mint Fee", 
    },
    {
      id: 3,
      question : "ICP Mint Fee",
      label1 : "Current ICP Mint Fee",
      label2 : "The Voted ICP Mint Fee", 
    },
    {
      id: 4,
      question : "Locking Threshold",
      label1 : "Current Locking Threshold",
      label2 : "The Voted Locking Threshold", 
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
