"use client";

import ExperienceCounter from "./ExperienceCounter";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [totalYears, setTotalYears] = useState<number | null>(null);

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
          <div className="valueCard"><span className="valueIcon">🎁</span><p>Real players get real prizes, including Amazon gift cards, for playing.</p></div>
          <div className="valueCard"><span className="valueIcon">✨</span><p>Newest games in the market and VIP section reviews.</p></div>
          <div className="valueCard counterValueCard"><ExperienceCounter value={totalYears} /><p>years of gaming experience combined.</p></div>
        </div>

        <div className="ctaRow bigCtaRow">
          <Link className="goldButton" href="/players">I&apos;m a player</Link>
          <Link className="ghostButton" href="/games">I&apos;m a game</Link>
        </div>
      </section>
    </main>
  );
}
