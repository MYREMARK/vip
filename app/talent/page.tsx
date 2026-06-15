import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Talent Network | The VIP Connector",
  description: "The TVC Talent Network — built for iGaming professionals seeking meaningful careers through relationships, understanding and long-term career alignment."
};

const steps = [
  {
    num: "Step 01",
    title: "Register",
    desc: "Join the TVC Talent Network by completing a structured registration process and sharing your professional background."
  },
  {
    num: "Step 02",
    title: "Qualification & Review",
    desc: "Each registration is reviewed to understand experience, career goals, market expertise and future opportunities that may be relevant."
  },
  {
    num: "Step 03",
    title: "Career Conversations",
    desc: "Where appropriate, we arrange personal discussions to better understand both the individual and the opportunity. We believe meaningful conversations provide far greater insight than a CV alone."
  },
  {
    num: "Step 04",
    title: "Opportunity Matching",
    desc: "When suitable opportunities become available, qualified members of the network may be considered for introductions, discussions and future roles."
  }
];

const disciplines = [
  "Executive & Leadership",
  "VIP & CRM",
  "Retention & Loyalty",
  "Operations",
  "Customer Support",
  "Payments & Risk",
  "Product & Technology",
  "Marketing & Acquisition",
  "Business Development",
  "Data & Analytics",
  "Compliance & Regulatory",
  "AI & Emerging Technologies"
];

export default function TalentPage() {
  return (
    <main className="innerPage">
      <p className="eyebrow">Talent Network</p>
      <h1>More Than Recruitment. Built Around People.</h1>
      <p>
        The TVC Talent Network is designed for professionals looking to build meaningful careers within the iGaming industry.
      </p>
      <p>
        Rather than operating as a traditional CV-driven recruitment service, our approach focuses on relationships, understanding and long-term career alignment. We believe the best opportunities are created when experience, personality, values and ambition are understood together — not simply matched through keywords on a resume.
      </p>

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
        <h2>Who We Work With</h2>
        <p>The TVC Talent Network supports professionals across a wide range of disciplines within iGaming, including:</p>
        <div className="tagGrid" role="list" aria-label="Supported disciplines">
          {disciplines.map((d) => (
            <span className="tagPill" key={d} role="listitem">{d}</span>
          ))}
        </div>
      </div>

      <div className="pageCta">
        <h2>Built For The Long Term</h2>
        <p>
          Careers evolve. Opportunities change. Relationships matter. Register your details and become part of the TVC Talent Network.
        </p>
        <div className="twoCta">
          <Link className="goldButton" href="/players">Register Now</Link>
        </div>
      </div>
    </main>
  );
}
