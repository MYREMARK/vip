import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning Network | The VIP Connector",
  description: "The TVC Learning Network — supporting iGaming professionals through learning, development and career growth with expert-led programmes and mentoring."
};

const futureAreas = [
  "Industry Knowledge & Fundamentals",
  "VIP & CRM Development",
  "Leadership & Management Skills",
  "AI & Emerging Technologies",
  "Communication & Relationship Building",
  "Career Development",
  "Professional Growth Workshops",
  "Expert-Led Learning Sessions",
  "Mentoring & Coaching",
  "Community Learning Initiatives"
];

const audience = [
  "New Industry Entrants",
  "Career Changers",
  "Specialists",
  "Managers",
  "Future Leaders",
  "Experienced Professionals",
  "Teams Seeking Development Opportunities"
];

export default function LearningPage() {
  return (
    <main className="innerPage">
      <p className="eyebrow">Learning Network</p>
      <h1>Learning. Development. Growth.</h1>
      <p>
        The TVC Learning Network is designed to support professionals, leaders and future talent across the iGaming industry through learning, development and career growth opportunities.
      </p>
      <p>
        As the industry continues to evolve, the ability to learn, adapt and develop new skills becomes increasingly valuable. Our vision is to create a learning ecosystem that supports individuals at different stages of their professional journey — from those entering the industry for the first time through to experienced specialists and leaders seeking continued growth.
      </p>

      <div className="pageSection">
        <h2>Current Learning Opportunities</h2>
        <div className="stepItem" style={{ maxWidth: "520px" }}>
          <p className="stepNum">Now Available</p>
          <h3>Interview Readiness</h3>
          <p>
            Our first learning initiative focuses on helping individuals prepare for interviews, career transitions and professional opportunities within the iGaming industry. Sessions are designed to provide practical guidance, confidence and preparation tailored to individual career goals.
          </p>
        </div>
      </div>

      <div className="pageSection">
        <h2>Future Learning Areas</h2>
        <p>As the Learning Network grows, future opportunities may include:</p>
        <ul className="pageList" aria-label="Future learning areas">
          {futureAreas.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="pageSection">
        <h2>Learning Beyond Courses</h2>
        <p>
          The TVC Learning Network is not intended to be a traditional training platform. We believe some of the most valuable learning comes through conversations, shared experiences, mentorship, practical insight and exposure to industry professionals.
        </p>
        <p>
          Our long-term vision is to create a learning environment that encourages continuous development, collaboration and knowledge sharing across the wider ecosystem.
        </p>
      </div>

      <div className="pageSection">
        <h2>Who Is It For?</h2>
        <div className="tagGrid" role="list" aria-label="Target audience">
          {audience.map((a) => (
            <span className="tagPill" key={a} role="listitem">{a}</span>
          ))}
        </div>
      </div>

      <div className="pageCta">
        <h2>Join The Learning Network</h2>
        <p>
          Whether you are exploring your first opportunity or continuing your professional journey, the TVC Learning Network is designed to support ongoing growth and development.
        </p>
        <div className="twoCta">
          <Link className="goldButton" href="/players">Register for Updates</Link>
        </div>
      </div>
    </main>
  );
}
