import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Intelligence Network | The VIP Connector",
  description: "The TVC Intelligence Network — a participant-driven ecosystem supporting behavioural intelligence, AI testing, research participation and future-focused innovation."
};

const contributions = [
  "AI testing projects",
  "Product testing and feedback",
  "Behavioural research initiatives",
  "Experience and usability studies",
  "Future-focused industry projects",
  "Surveys and structured feedback activities",
  "Intelligence and insight programmes"
];

const principles = [
  "Trust",
  "Respect",
  "Professionalism",
  "Confidentiality",
  "Meaningful participation",
  "Responsible intelligence"
];

export default function IntelligencePage() {
  return (
    <main className="innerPage">
      <p className="eyebrow">Intelligence Network</p>
      <h1>Real Players. Real Insight. Real Intelligence.</h1>
      <p>
        The TVC Intelligence Network is a participant-driven ecosystem designed to support behavioural intelligence, AI testing, research participation, product feedback and future-focused innovation.
      </p>
      <p>
        Built around real-world experience, the network brings together participants, operators and innovators who believe that better decisions come from better understanding. In a world increasingly shaped by Artificial Intelligence, data and automation, genuine human insight remains one of the most valuable sources of intelligence available. The TVC Intelligence Network exists to help bridge that gap.
      </p>

      <div className="pageSection">
        <h2>Why The Network Exists</h2>
        <p>Technology can tell us what people do. Intelligence helps us understand why.</p>
        <p>
          The Intelligence Network was created to provide a structured environment where organisations can learn from real experiences, real behaviours and real perspectives.
        </p>
        <p>
          By combining participant insight with AI-driven initiatives, behavioural research and testing opportunities, the network supports a deeper understanding of products, experiences and future possibilities.
        </p>
      </div>

      <div className="pageSection">
        <h2>What Participants May Be Invited To Contribute To</h2>
        <ul className="pageList" aria-label="Contribution opportunities">
          {contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p style={{ marginTop: "22px" }}>
          Participation is always project-based and may vary depending on suitability, experience and project requirements.
        </p>
      </div>

      <div className="pageSection">
        <div className="dualSection">
          <div className="dualCard">
            <h3>For Participants</h3>
            <p>
              The Intelligence Network offers an opportunity to contribute to projects designed to explore behaviour, technology, products and future innovation. Participants help shape meaningful intelligence while sharing their experiences, perspectives and feedback. Approved participants may receive project-based rewards and recognition opportunities depending on the nature and scope of individual projects.
            </p>
          </div>
          <div className="dualCard">
            <h3>For Operators</h3>
            <p>
              Access structured participant insight, testing environments and future intelligence initiatives designed to support product development, innovation and strategic decision-making. The network is designed to provide access to authentic perspectives, behavioural understanding and real-world feedback from engaged participants.
            </p>
          </div>
        </div>
      </div>

      <div className="pageSection">
        <h2>Our Principles</h2>
        <p>Everything within the Intelligence Network is built around:</p>
        <ul className="pageList" aria-label="Network principles">
          {principles.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p style={{ marginTop: "22px" }}>
          We believe the future of intelligence lies in combining technology with authentic human understanding.
        </p>
      </div>

      <div className="pageCta">
        <h2>Join The Network</h2>
        <p>
          Whether you are interested in participating in future projects or exploring intelligence opportunities for your organisation, we invite you to become part of the next generation of intelligence, insight and innovation.
        </p>
        <div className="twoCta">
          <Link className="goldButton" href="/players">Participant Registration</Link>
          <Link className="ghostButton" href="/operators">Operator Registration</Link>
        </div>
      </div>
    </main>
  );
}
