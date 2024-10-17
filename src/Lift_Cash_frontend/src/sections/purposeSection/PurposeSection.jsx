import React from "react";
import "./PurposeSection.css"; // Import the CSS file
import shape4 from "../../assets/shape-4.svg";

const PurposeSection = () => {
  const purposes = [
    {
      title: "Cooperation",
      description:
        "Cooperation is what we do. Lift Cash is cooperation as a currency. How we value Lift Cash is how we value cooperation.",
      icon: "🎁", // You can replace this with your icon/image
    },
    {
      title: "Benefits",
      description:
        "What benefits us, benefits others. The weekly income in Lift Cash tokens is the benefit for us personally—and also the benefit for each other.",
      icon: "🎁",
    },
    {
      title: "Give + Earn",
      description:
        "Earn while we’re giving. Give while we’re earning. Every vote in the Lift Cash Economic System is a gift to ourselves AND others.",
      icon: "📦",
    },
    {
      title: "Community",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sit eum eos ea rem quasi quaerat animi asperiores, odio exercitationem? Vel magnam rerum eligendi, recusandae quas sapiente eos sit amet!",
      icon: "📦",
    },
    {
      title: "Empower",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sit eum eos ea rem quasi quaerat animi asperiores, odio exercitationem? Vel magnam rerum eligendi, recusandae quas sapiente eos sit amet!",
      icon: "🎁",
    },
    {
      title: "Commons",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sit eum eos ea rem quasi quaerat animi asperiores, odio exercitationem? Vel magnam rerum eligendi, recusandae quas sapiente eos sit amet!",
      icon: "🎁",
    },
    {
      title: "Freedom",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sit eum eos ea rem quasi quaerat animi asperiores, odio exercitationem? Vel magnam rerum eligendi, recusandae quas sapiente eos sit amet!",
      icon: "📦",
    },
    {
      title: "Decmocarcy",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sit eum eos ea rem quasi quaerat animi asperiores, odio exercitationem? Vel magnam rerum eligendi, recusandae quas sapiente eos sit amet!",
      icon: "📦",
    },
  ];

  return (
    <section className="purpose-section">
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
