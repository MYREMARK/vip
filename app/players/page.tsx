import RegisterForm from "@/components/RegisterForm";

export default function PlayersPage() {
  return (
    <main className="innerPage formPage">
      <p className="eyebrow">Player access</p>
      <h1>Join the VIP player panel</h1>
      <p>Register as a player, share your gaming experience, and join premium playtests and review opportunities.</p>
      <RegisterForm role="player" />
    </main>
  );
}
