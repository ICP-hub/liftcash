import React from "react";
import "./PurposeSection.css"; // Import the CSS file
import { purposes } from "../../assets/data/Purpose";

const PurposeSection = () => {
  return (
    <section className="purpose-section" id="purpose">
      <h3 className="purpose-title">Purpose</h3>
      <h1 className="purpose-heading">Main Purpose Of Lift Cash</h1>
      <p className="purpose-subheading">
        Lift Cash is free to enter and start using. Participation only <br />{" "}
        costs minutes of time each week to vote.
      </p>

      <div className="purpose-grid">
        {purposes.map((purpose, index) => (
          <div key={index} className="purpose-card">
            <div className="purpose-icon">{purpose.icon}</div>
            <h3 className="purpose-card-title">{purpose.title}</h3>
            <p className="purpose-card-description">{purpose.description}</p>
            <a href="#" className="purpose-learn-more">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PurposeSection;
