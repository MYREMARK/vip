import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | The VIP Connector",
  description: "Get in touch with The VIP Connector. Whether you have a question, a project in mind or want to explore how the network can support your goals."
};

export default function ContactPage() {
  return (
    <main className="innerPage">
      <p className="eyebrow">Contact</p>
      <h1>Start the Conversation.</h1>
      <p>
        Whether you have a question, a project in mind or want to explore how the TVC network can support your goals, we would be glad to hear from you.
      </p>

      <div className="pageSection">
        <div className="dualSection">
          <div className="dualCard">
            <h3>For Participants</h3>
            <p>
              Interested in contributing to AI testing, research projects or intelligence initiatives? Register your details and we will be in touch when relevant opportunities become available.
            </p>
            <div style={{ marginTop: "20px" }}>
              <Link className="goldButton" href="/players" style={{ fontSize: "0.76rem", padding: "13px 22px" }}>
                Participant Registration
              </Link>
            </div>
          </div>
          <div className="dualCard">
            <h3>For Operators</h3>
            <p>
              Looking to explore intelligence opportunities, talent, partnerships or future collaboration? Register your interest and we will reach out to begin the conversation.
            </p>
            <div style={{ marginTop: "20px" }}>
              <Link className="ghostButton" href="/operators" style={{ fontSize: "0.76rem", padding: "13px 22px" }}>
                Operator Registration
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pageSection">
        <div className="textCard">
          <p style={{ margin: 0, textAlign: "center", fontFamily: "Inter, ui-sans-serif, system-ui, Arial, sans-serif", color: "#b9a16f", fontSize: "0.95rem", lineHeight: "1.7" }}>
            The VIP Connector operates by invitation, referral and registration. All enquiries are reviewed and responded to personally. We look forward to hearing from you.
          </p>
        </div>
      </div>
    </main>
  );
}
