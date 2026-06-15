"use client";

import ExperienceCounter from "./ExperienceCounter";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [totalYears, setTotalYears] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/metrics")
      .then((r) => r.json())
      .then((d) => setTotalYears(d.totalYears || 0))
      .catch(() => setTotalYears(0));
  }, []);

  return (
    <main className="heroShell centeredHero">
      <div className="starCrown" aria-hidden="true">
        <span>✦</span><span>✧</span><span>✦</span><span>✧</span><span>✦</span>
      </div>
      <section className="heroContent">
        <h1>Real Players. Real Insight. Real Intelligence.</h1>
        <p className="heroLead">
          A participant-driven intelligence network supporting AI testing, behavioural research, product feedback and future-focused gaming innovation.
        </p>

        <div className="valueCards">
          <div className="valueCard">
            <span className="valueCardTitle">Behavioural Intelligence</span>
            <p>Real participant insight designed to help understand player behaviour, preferences and experiences.</p>
          </div>
          <div className="valueCard">
            <span className="valueCardTitle">AI Testing &amp; Research</span>
            <p>Support AI projects, product testing and future-focused research initiatives across gaming and technology.</p>
          </div>
          <div className="valueCard counterValueCard">
            <span className="valueCardTitle">Collective Experience</span>
            <ExperienceCounter value={totalYears} />
            <p>years of gaming experience contributed by network participants.</p>
          </div>
        </div>

        <div className="ctaRow bigCtaRow">
          <Link className="goldButton" href="/players">Participant Registration</Link>
          <Link className="ghostButton" href="/operators">Operator Registration</Link>
        </div>

        <div className="heroSubtext">
          <div className="heroSubtextItem">
            <strong>For Participants</strong>
            <p>Participate in AI testing, research projects, product feedback and future intelligence initiatives. Approved participants may receive project-based rewards and recognition opportunities.</p>
          </div>
          <div className="heroSubtextItem">
            <strong>For Operators</strong>
            <p>Access structured participant insight, testing environments and future intelligence projects designed to support product development and strategic decision-making.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
