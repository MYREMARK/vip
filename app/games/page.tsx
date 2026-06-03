import RegisterForm from "@/components/RegisterForm";

export default function GamesPage() {
  return (
    <main className="innerPage formPage">
      <p className="eyebrow">Studio access</p>
      <h1>Register your game</h1>
      <p>Submit your game for VIP player feedback, premium testing, and smarter monetization insights.</p>
      <RegisterForm role="game" />
    </main>
  );
}
