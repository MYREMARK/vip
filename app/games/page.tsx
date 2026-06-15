import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Operator Registration | The VIP Connector",
  description: "Register your organisation with the TVC Operator Network. Access structured participant insight, intelligence projects and future collaboration opportunities."
};

export default function GamesPage() {
  return (
    <main className="innerPage formPage">
      <p className="eyebrow">Operator Registration</p>
      <h1>Register Your Interest</h1>
      <p>
        Register your organisation and begin the conversation. Access structured participant insight, testing environments and future intelligence projects designed to support product development and strategic decision-making.
      </p>
      <RegisterForm role="game" />
    </main>
  );
}
