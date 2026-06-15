import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | The VIP Connector",
  description: "The VIP Connector was created to bridge the gap between intelligence, technology and real-world human insight across the iGaming industry."
};

export default function AboutPage() {
  return (
    <main className="innerPage">
      <p className="eyebrow">About</p>
      <h1>Technology is evolving faster than ever.</h1>
      <p>
        Artificial Intelligence is transforming industries, changing how products are built, how decisions are made and how organisations understand the people they serve.
      </p>
      <p>
        Yet behind every platform, every product and every data point, there is something that technology alone cannot fully explain: Human experience.
      </p>
      <p>
        The VIP Connector was created to help bridge the gap between intelligence, technology and real-world insight.
      </p>

      <div className="pageSection">
        <h2>What We Believe</h2>
        <p>
          We believe the future belongs to organisations that combine innovation with genuine human understanding.
        </p>
        <p>
          Through participant-driven intelligence, behavioural research, AI testing, product feedback and future-focused collaboration, we are building an ecosystem designed to generate meaningful insight and better decision-making.
        </p>
        <p>
          Our networks bring together participants, operators, professionals and innovators who share a common goal: to better understand behaviour, experience and the opportunities shaping the future.
        </p>
      </div>

      <div className="pageSection">
        <h2>What We Are Building</h2>
        <p>
          This is not about collecting data for the sake of data. It is about creating intelligence that is more human, more relevant and more valuable.
        </p>
        <p>
          As technology continues to evolve, we believe the most powerful intelligence will come from combining AI with authentic human insight.
        </p>
        <p>
          That is the future we are building. And we are only getting started.
        </p>
      </div>
    </main>
  );
}
