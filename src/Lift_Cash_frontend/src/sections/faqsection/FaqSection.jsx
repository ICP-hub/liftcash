import "./FaqSection.css";
import { GoQuestion } from "react-icons/go";
import shape5 from "../../assets/images/shape-5.svg";
import shape4 from "../../assets/images/shape-4.svg";
import { faqs } from "../../assets/data/Faq";

const FaqSection = () => {
  return (
    <div className="faq-container" id="faq">
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
