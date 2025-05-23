import React from "react";
import "../styles/home.css";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";

function Home() {
 //Animations
  const particles = Array.from({ length: 30 }, (_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${5 + Math.random() * 5}s`,
      }}
    />
  ));

  return (
    <div className="home">
      <div className="overlay">
        {particles}
        <img src={logo} alt="App Logo" className="home-logo" />
        <h1 className="welcome-text">
          Can You Guess the 
          <span> App ?</span>
        </h1>
       <p className="subtext">
 AI writes the story, You guess which app it’s about - Powered by Preplexity
  <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer">
    <span className="ai-badge">AI</span>
  </a>
</p>


        <Link to="/quiz" className="start-button">Challenge the Whiz</Link>
      </div>
    </div>
  );
}

export default Home;
