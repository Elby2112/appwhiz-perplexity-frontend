import React from 'react';
import '../styles/about.css';
import profileImage from '../assets/me.png';

const About = () => {
  return (
    <div className="about">
      <div className="overlay">
        <h1 className="title">🌟 About the App</h1>

        <div className="about-card">
          <div className="profile-section">
            <img src={profileImage} alt="Developer" className="profile-img" />
            <div className="intro-text">
              <h2>Hi, I'm Loubna 👋</h2>
              <p>
                I'm a Junior software Developer passionate about building interactive and intelligent apps.
                This project is a fun blend of storytelling and AI to test how well you know your favorite apps!
              </p>
            </div>
          </div>

          <div className="project-section">
            <h2>🎮 The Game</h2>
 
            <p>
              The app generates short stories that subtly describe a famous app. Your goal? Guess which app it is before you run out of guesses!
              You can tweak the difficulty, language, genre, and number of attempts. It’s like charades — but smarter.
            </p>
             <h3>🛠️ Tech Stack</h3>
              <p>
                I used <strong>React</strong>, <strong>Python</strong>, <strong>FastAPI</strong>, and <strong>Perplexity Sonar API</strong> to generate dynamic stories.
              </p>
            <p>
              The story is generated live by a backend powered by AI, using hints and themes you choose. It’s designed to challenge your mind while having fun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
