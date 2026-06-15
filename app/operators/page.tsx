import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Operator Network | The VIP Connector",
  description: "The TVC Operator Network — connecting iGaming operators, founders and decision-makers with intelligence, talent, partnerships and future collaboration opportunities."
};

const reasons = [
  "Talent & Recruitment Support",
  "Intelligence & Research Projects",
  "AI Testing & Innovation Initiatives",
  "Strategic Discussions",
  "Industry Insights",
  "Learning & Development Opportunities",
  "Partnerships & Collaborations",
  "Business Growth Opportunities",
  "Future Ecosystem Projects"
];

const steps = [
  {
    num: "Step 01",
    title: "Register",
    desc: "Complete a simple operator registration and tell us more about your business, challenges, interests and objectives."
  },
  {
    num: "Step 02",
    title: "Discovery & Relationship Building",
    desc: "We take time to understand your business, priorities and areas of interest."
  },
  {
    num: "Step 03",
    title: "Opportunities & Collaboration",
    desc: "Depending on your goals, this may include introductions, projects, talent discussions, intelligence initiatives, learning opportunities, strategic conversations or future ecosystem activities."
  }
];

const whoShouldJoin = [
  "Operators",
  "Founders",
  "CEOs",
  "Directors",
  "Department Leaders",
  "Product Teams",
  "Marketing Teams",
  "VIP & CRM Leaders",
  "Innovation & AI Teams",
  "Industry Specialists"
];

export default function OperatorsPage() {
  return (
    <main className="innerPage">
      <p className="eyebrow">Operator Network</p>
      <h1>Built Around Relationships, Trust and Collaboration.</h1>
      <p>
        The TVC Operator Network is designed to bring together operators, leaders, founders, specialists and decision-makers across the iGaming industry.
      </p>
      <p>
        Rather than focusing on a single service, the network provides a central point of connection for businesses looking to explore opportunities, projects, talent, insights, partnerships and future collaboration. Whether you are building, growing, solving challenges or exploring new ideas, meaningful relationships often create the greatest opportunities.
      </p>

      <div className="pageSection">
        <h2>Why Join The Network?</h2>
        <p>Operators engage with the TVC ecosystem for many different reasons, including:</p>
        <ul className="pageList" aria-label="Reasons to join">
          {reasons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p style={{ marginTop: "22px" }}>
          The network is designed to create valuable conversations, introductions and opportunities over time.
        </p>
      </div>

      <div className="pageSection">
        <h2>How It Works</h2>
        <div className="stepGrid">
          {steps.map((step) => (
            <div className="stepItem" key={step.num}>
              <p className="stepNum">{step.num}</p>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pageSection">
        <h2>Who Should Join?</h2>
        <div className="tagGrid" role="list" aria-label="Who should join">
          {whoShouldJoin.map((w) => (
            <span className="tagPill" key={w} role="listitem">{w}</span>
          ))}
        </div>
        <p style={{ marginTop: "22px" }}>
          If you are involved in building, operating or growing an iGaming business, we invite you to become part of the TVC Operator Network.
        </p>
      </div>

      <div className="pageCta">
        <h2>Register Your Interest</h2>
        <p>
          As the ecosystem continues to grow, operators will have opportunities to participate in future projects, discussions, industry initiatives and collaborative opportunities. Start the conversation today.
        </p>
        <div className="twoCta">
          <Link className="goldButton" href="/games">Register Now</Link>
          <Link className="ghostButton" href="/contact">Get in Touch</Link>
        </div>
      </div>
    </main>
  );
}
