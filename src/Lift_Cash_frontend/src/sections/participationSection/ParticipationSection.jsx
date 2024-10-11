import React from "react";
import "./ParticipationSection.css"; // Import the CSS file

const ParticipationSection = () => {
  return (
    <section className="participation-section">
      <div className="content">
        <h2 className="heading">How to participate?</h2>
        <p className="sub-heading">Get Started Now</p>
        <p className="description">
          Lift Cash is free to enter and start using. Participation only costs{" "}
          <br />
          minutes of time each week to vote.
        </p>
        <section className="list-section">
          <ul className="list">
            <li>
              <a href="javascript:void(0);" className="link">
                Download the WebAuth
              </a>{" "}
              wallet and setup your Proton account.
            </li>
            <li>
              Verify your identity at{" "}
              <a href="https://identity.metallicus.com" className="link">
                identity.metallicus.com
              </a>
            </li>
            <li>
              Join and participate in an economy that grows with the people.
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
};

export default ParticipationSection;
