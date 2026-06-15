import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Participant Registration | The VIP Connector",
  description: "Register as a participant in the TVC Intelligence Network. Contribute to AI testing, research projects, product feedback and future intelligence initiatives."
};

export default function PlayersPage() {
  return (
    <main className="innerPage formPage">
      <p className="eyebrow">Participant Registration</p>
      <h1>Join The Network</h1>
      <p>
        Register as a participant and contribute to AI testing, research projects, product feedback and future intelligence initiatives. Approved participants may receive project-based rewards and recognition opportunities.
      </p>
      <RegisterForm role="player" />
    </main>
  );
}
