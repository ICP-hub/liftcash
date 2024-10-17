import "./FaqSection.css";
import { GoQuestion } from "react-icons/go";
import shape5 from "../../assets/shape-5.svg";
import shape4 from "../../assets/shape-4.svg";

const FaqSection = () => {
  const faqs = [
    {
      question: "How does Lift Cash work?",
      answer:
        "Lift Cash operates by allowing its community members to vote on monetary policies each week. These votes help manage the supply and demand dynamics of Lift Cash tokens, aiming to maintain a healthy token price. Participation is simple and free, requiring just a few minutes each week to vote.",
    },
    {
      question: "What is Lift Cash?",
      answer:
        "Lift cash is a decentralized economic system that provides a universal basic income (UBI) through its community-driven cryptocurrency, Lift Cash. Participants vote on monetary policies weekly, which directly influences the distribution and value of the Lift Cash tokens.",
    },
    {
      question: "Who can join Lift Cash?",
      answer:
        "Anyone can join Lift Cash. The system is designed to attract a diverse group of participants, including community leaders, cooperatives, DAOs, freedom advocates, and blockchain enthusiasts.",
    },
    {
      question: "What are the benefits of participating in Lift Cash?",
      answer:
        "Participants in Lift Cash benefit from receiving a weekly income in Lift Cash tokens. This system promotes cooperation, democracy, and peer-to-peer connections, rewarding individuals based on their contributions.",
    },
    {
      question:
        "What makes Lift Cash different from traditional economic systems?",
      answer:
        "Lift Cash aims to be resilient and flexible, functioning alongside or independently of traditional financial systems. It promotes an inclusive and transparent governance model driven by its community.",
    },
    {
      question: "How is Lift Cash governed?",
      answer:
        "Lift Cash aims to be resilient and flexible, functioning alongside or independently of traditional financial systems. It promotes an inclusive and transparent governance model driven by its community.",
    },
  ];

  return (
    <div className="faq-container">
      <img src={shape4} alt="shape4" className="pl-4" />
      <h2 className="faq-title">FAQ</h2>
      <h3 className="faq-subtitle">Your Questions Answered</h3>
      <p className="faq-description">
        Discover more about Lift Cash, its benefits, governance, and how <br />
        you can be a part of this innovative economic system.
      </p>

      <div className="faq-grid">
        {faqs.map((faq, index) => (
          <div key={index} className=" faq-item">
            <span className="faq-logo">
              <GoQuestion />
            </span>

            <div>
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <img src={shape5} alt="shape5" className="float-end -mt-15 pr-5" />
    </div>
  );
};

export default FaqSection;
