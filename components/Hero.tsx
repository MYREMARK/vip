"use client";

import { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm";

export default function Hero() {
  const [totalYears, setTotalYears] = useState<number | null>(null);
  const [role, setRole] = useState<"player" | "game">("player");

  useEffect(() => {
    fetch("/api/metrics")
      .then((response) => response.json())
      .then((data) => setTotalYears(data.totalYears || 0))
      .catch(() => setTotalYears(0));
  }, []);

  return (
    <main className="heroShell centeredHero">
      <div className="starCrown" aria-hidden="true">
        <span>✦</span><span>✧</span><span>✦</span><span>✧</span><span>✦</span>
      </div>
      <section className="heroContent">
        <p className="eyebrow">Three paths. One network.</p>
        <h1>VIP player intelligence for premium gaming studios</h1>
        <p className="heroLead">Connect with real players, test new gaming experiences, and turn premium feedback into better products, stronger retention, and smarter monetization.</p>

        <div className="valueCards">
          <div className="valueCard"><span>🎁</span><p>Real players get real prizes, including Amazon gift cards, for playing.</p></div>
          <div className="valueCard"><span>✨</span><p>Newest games in the market and VIP section reviews.</p></div>
          <div className="valueCard"><span>👑</span><p><strong>{totalYears === null ? "XXX" : totalYears}</strong> years of gaming experience combined.</p></div>
        </div>

        <div className="ctaRow bigCtaRow">
          <button className={role === "player" ? "goldButton" : "ghostButton"} onClick={() => setRole("player")}>I&apos;m a player</button>
          <button className={role === "game" ? "goldButton" : "ghostButton"} onClick={() => setRole("game")}>I&apos;m a game</button>
        </div>

        <RegisterForm role={role} onRegistered={setTotalYears} />
      </section>
    </main>
  );
}
