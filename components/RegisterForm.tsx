"use client";

import { FormEvent, useState } from "react";

type Props = {
  role: "player" | "game";
  onRegistered?: (totalYears: number) => void;
};

const countries = [
  "United Kingdom",
  "Malta",
  "Gibraltar",
  "Isle of Man",
  "Ireland",
  "Sweden",
  "Denmark",
  "Finland",
  "Netherlands",
  "Germany",
  "Spain",
  "Italy",
  "France",
  "Portugal",
  "Estonia",
  "Latvia",
  "Lithuania",
  "Romania",
  "Bulgaria",
  "Canada",
  "United States",
  "Brazil",
  "Mexico",
  "Colombia",
  "Peru",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Australia",
  "New Zealand",
  "Japan",
  "South Korea",
  "India",
  "Philippines",
  "Israel",
  "Other"
];

const igamingSectors = [
  "Online Casino",
  "Sports Betting",
  "Poker",
  "Live Casino",
  "eSports & Gaming",
  "iGaming Technology & Platform",
  "Payments & FinTech",
  "Affiliate & Marketing",
  "Compliance & Regulation",
  "Multiple areas",
  "Other"
];

const operatorRoles = [
  "CEO / Founder",
  "Director",
  "Head of Department",
  "Product Manager",
  "VIP & CRM Leader",
  "Marketing Lead",
  "Innovation & AI Lead",
  "Compliance & Regulatory",
  "Technology Lead",
  "Commercial & Partnerships",
  "Other"
];

const businessAreas = [
  "Online Casino",
  "Sportsbook",
  "Poker",
  "Live Casino",
  "iGaming Platform / Software",
  "Payments & FinTech",
  "eSports",
  "Affiliate & Performance Marketing",
  "Compliance & Regulation",
  "Multiple verticals",
  "Other"
];

export default function RegisterForm({ role, onRegistered }: Props) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);
    setStatus("");

    const formData = new FormData(form);
    const payload =
      role === "player"
        ? {
            role,
            name: formData.get("name"),
            email: formData.get("email"),
            experienceYears: Number(formData.get("experienceYears")),
            igamingSector: formData.get("igamingSector"),
            location: formData.get("location")
          }
        : {
            role,
            name: formData.get("name"),
            email: formData.get("email"),
            organisationName: formData.get("organisationName"),
            jobTitle: formData.get("jobTitle"),
            businessArea: formData.get("businessArea")
          };

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus(data.error || "Something went wrong. Please try again.");
      return;
    }

    if (typeof data.metrics?.totalYears === "number") {
      onRegistered?.(data.metrics.totalYears);
    }
    setStatus(
      role === "player"
        ? "Registration received. We will be in touch when relevant opportunities become available."
        : "Thank you for your interest. We will be in touch to begin the conversation."
    );
    form.reset();
  }

  return (
    <form className="registerForm" onSubmit={submit} key={role}>
      <div className="formIntro">
        <p>{role === "player" ? "Participant Registration" : "Operator Registration"}</p>
        <h2>{role === "player" ? "Join the Intelligence Network" : "Register Your Organisation"}</h2>
      </div>

      {role === "player" ? (
        <div className="formGrid playerFormGrid">
          <label>
            Full name
            <input name="name" type="text" placeholder="Your full name" required />
          </label>
          <label>
            Email address
            <input name="email" type="email" placeholder="you@email.com" required />
          </label>
          <label>
            Years of iGaming experience
            <input name="experienceYears" type="number" min="0" max="80" placeholder="e.g. 8" required />
          </label>
          <label>
            Primary iGaming sector
            <select name="igamingSector" required defaultValue="">
              <option value="" disabled>Select your primary area</option>
              {igamingSectors.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label>
            Country
            <select name="location" required defaultValue="">
              <option value="" disabled>Select country</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>
      ) : (
        <div className="formGrid gameFormGrid">
          <label>
            Your name
            <input name="name" type="text" placeholder="Your full name" required />
          </label>
          <label>
            Work email
            <input name="email" type="email" placeholder="you@company.com" required />
          </label>
          <label>
            Organisation name
            <input name="organisationName" type="text" placeholder="Your company or brand name" required />
          </label>
          <label>
            Your role
            <select name="jobTitle" required defaultValue="">
              <option value="" disabled>Select your role</option>
              {operatorRoles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
          <label>
            Business area
            <select name="businessArea" defaultValue="">
              <option value="">Select business area (optional)</option>
              {businessAreas.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>
        </div>
      )}

      <button type="submit" className="goldButton submitButton" disabled={loading}>
        {loading ? "Sending..." : role === "player" ? "Register as a Participant" : "Register Interest"}
      </button>
      {status && <p className="formStatus">{status}</p>}
    </form>
  );
}
