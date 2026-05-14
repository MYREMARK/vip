"use client";

import { FormEvent, useState } from "react";

type Props = {
  role: "player" | "game";
  onRegistered: (totalYears: number) => void;
};

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Israel",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Sweden",
  "Denmark",
  "Norway",
  "Finland",
  "Brazil",
  "Mexico",
  "India",
  "Japan",
  "South Korea",
  "Other"
];

const categories = [
  "Action",
  "Adventure",
  "Arcade",
  "Battle Royale",
  "Casino",
  "Casual",
  "MMORPG",
  "Puzzle",
  "Racing",
  "RPG",
  "Shooter",
  "Simulation",
  "Sports",
  "Strategy",
  "Other"
];

const gameTypes = [
  "Mobile game",
  "PC game",
  "Console game",
  "Web game",
  "Casino game",
  "Social casino",
  "Indie game",
  "AAA game",
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
            favoriteGameCategory: formData.get("favoriteGameCategory"),
            location: formData.get("location")
          }
        : {
            role,
            name: formData.get("name"),
            email: formData.get("email"),
            gameName: formData.get("gameName"),
            yearsOnline: Number(formData.get("yearsOnline")),
            gameType: formData.get("gameType")
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

    onRegistered(data.metrics.totalYears);
    setStatus(role === "player" ? "Player registration received. Welcome to the network." : "Game registration received. Our studio team will review it.");
    form.reset();
  }

  return (
    <form className="registerForm" onSubmit={submit} key={role}>
      <div className="formIntro">
        <p>{role === "player" ? "Player access" : "Studio access"}</p>
        <h2>{role === "player" ? "Join the VIP player panel" : "Register your game"}</h2>
      </div>

      {role === "player" ? (
        <div className="formGrid playerFormGrid">
          <label>
            Name
            <input name="name" type="text" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" placeholder="you@email.com" required />
          </label>
          <label>
            How many years of gaming experience do you have?
            <input name="experienceYears" type="number" min="0" max="80" placeholder="7" required />
          </label>
          <label>
            Favorite game category
            <select name="favoriteGameCategory" required defaultValue="">
              <option value="" disabled>Select category</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <label>
            Location
            <select name="location" required defaultValue="">
              <option value="" disabled>Select country</option>
              {countries.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
          </label>
        </div>
      ) : (
        <div className="formGrid gameFormGrid">
          <label>
            Contact name
            <input name="name" type="text" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" placeholder="you@email.com" required />
          </label>
          <label>
            Name of the game
            <input name="gameName" type="text" placeholder="Game title" required />
          </label>
          <label>
            Years online
            <input name="yearsOnline" type="number" min="0" max="80" placeholder="3" required />
          </label>
          <label>
            Type
            <select name="gameType" required defaultValue="">
              <option value="" disabled>Select type</option>
              {gameTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>
        </div>
      )}

      <button type="submit" className="goldButton submitButton" disabled={loading}>{loading ? "Sending..." : role === "player" ? "Join as a player" : "Submit game"}</button>
      {status && <p className="formStatus">{status}</p>}
    </form>
  );
}
