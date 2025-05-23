import React, { useState } from 'react';
import '../styles/quiz.css';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {

  const difficultyMap = {
    1: 'easy',
    2: 'medium',
    3: 'hard',
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [selectedLang, setSelectedLang] = useState('');
  const [randomClicked, setRandomClicked] = useState(false);
  const [numGuesses, setNumGuesses] = useState(8);

  const genres = [
    { label: 'Sci-Fi 🛸', value: 'sci-fi' },
    { label: 'Fantasy 🧙‍♂️', value: 'fantasy' },
    { label: 'Mystery 🕵️‍♀️', value: 'mystery' },
    { label: 'Comedy 😂', value: 'comedy' },
    { label: 'Thriller 🔪', value: 'thriller' },
    { label: 'Surprise Me 🎲', value: 'random' },
  ];

  const languages = [
    { code: 'en', name: 'English', emoji: '🇬🇧' },
    { code: 'fr', name: 'Français', emoji: '🇫🇷' },
    { code: 'es', name: 'Español', emoji: '🇪🇸' },
    { code: 'ar', name: 'العربية', emoji: '🇸🇦' },
    { code: 'nl', name: 'Nederlands', emoji: '🇳🇱' },
  ];

  const handleGenreClick = (value) => {
    if (value === 'random') {
      const filtered = genres.filter((g) => g.value !== 'random');
      const random = filtered[Math.floor(Math.random() * filtered.length)];
      setSelectedGenre(random.value);
      setRandomClicked(true);
    } else {
      setSelectedGenre(value);
      setRandomClicked(false);
    }
  };

  const setDefaultConfig = () => {
    handleGenreClick('random');
    setDifficulty(1);
    setSelectedLang('en');
    setNumGuesses(5);
  };

  const handleStartGame = async () => {
    if (!selectedGenre || !selectedLang) {
      alert("Please select a genre and language.");
      return;
    }

    setIsLoading(true);

    const quizData = {
      genre: selectedGenre,
      difficulty: difficultyMap[difficulty],
      language: selectedLang,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) throw new Error("Failed to generate story");

      const data = await response.json();

      navigate("/chat", {
        state: {
          ...data,
          number_of_guesses: numGuesses,
        },
      });
    } catch (err) {
      console.error("Error starting game:", err.message);
      alert("An error occurred while starting the game.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="quiz">
      <div className="quiz-overlay">
        <h1 className="quiz-title">APP WHIZ</h1>
        <p className="quiz-description">
          Press on Start game to get a story written by Preplexity AI. Can you guess the app? Use hints if you're stuck!
        </p>

        <div className="quiz-card">
          <h2 className="card-title">Customize Your Experience</h2>

          <div className="section">
            <label>🎭 Choose Genre:</label>
            <div className="genre-options">
              {genres.map((genre) => (
                <button
                  key={genre.value}
                  className={`genre-btn ${
                    (genre.value === 'random' && randomClicked) ||
                    (selectedGenre === genre.value && !randomClicked)
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => handleGenreClick(genre.value)}
                >
                  {genre.label}
                </button>
              ))}
            </div>
          </div>

          <div className="section">
            <label>🎮 Difficulty:</label>
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="3"
                step="1"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="difficulty-slider"
              />
              <div className="difficulty-labels">
                <span className={difficulty === 1 ? 'active' : ''}>😌Easy</span>
                <span className={difficulty === 2 ? 'active' : ''}>😬Medium</span>
                <span className={difficulty === 3 ? 'active' : ''}>😱Hard</span>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="guess-label-container">
              <label>🎯 Number of Guesses:</label>
              <div className="guess-value">
                <span>{numGuesses}</span>
              </div>
            </div>
            <div className="guess-slider-container">
              <input
                type="range"
                className="guess-slider"
                min="3"
                max="15"
                value={numGuesses}
                onChange={(e) => setNumGuesses(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="section">
            <div className="row-container">
              <select
                className="language-dropdown"
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
              >
                <option value="" disabled>🌍 Select Language</option>
                {languages.map(({ code, name, emoji }) => (
                  <option key={code} value={code}>
                    {emoji} {name}
                  </option>
                ))}
              </select>
              <button className="default-btn" onClick={setDefaultConfig}>
                Set Default
              </button>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="progress-bar-container">
            <div className="progress-bar"></div>
            <p className="loading-text">Generating story...</p>
          </div>
        )}

        <button className="start-btn" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Quiz;
