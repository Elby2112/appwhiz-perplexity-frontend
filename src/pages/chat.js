import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/chat.css';
import { FaLightbulb } from 'react-icons/fa';
import preplexity from '../assets/perplexity-color.png';
import fireworksGif from '../assets/fireworks3.gif';
import backIcon from '../assets/left-arrow.png';

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    } else {
      console.log("Received data in Chat:", location.state);
    }
  }, [location.state, navigate]);

  // Destructure backend data with fallback defaults
  const {
    title = "Untitled Story",
    story = "No story provided.",
    hint1 = "",
    hint2 = "",
    hint3 = "",
    app = "",
    success_messages = ["Well done!"],
    fail_messages = ["Better luck next time!"],
    image = "",
    number_of_guesses = 3,
  } = location.state || {};

  const hints = [hint1, hint2, hint3].filter(h => h.trim() !== "");

  const [messages, setMessages] = useState([{ sender: 'bot', text: story, id: Date.now() }]);
  const [input, setInput] = useState('');
  const [guessesLeft, setGuessesLeft] = useState(Number(number_of_guesses));
  const [gameOver, setGameOver] = useState(false);
  const [showFireworksGif, setShowFireworksGif] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const handleSend = () => {
  if (!input.trim() || gameOver) return;

  const userInput = input.trim().toLowerCase();
  const correctAnswer = app.trim().toLowerCase();

  const userMessage = { sender: 'user', text: input, id: Date.now() };
  const typingId = Date.now() + 1;

  setMessages(prev => [...prev, userMessage, { sender: 'bot', text: '...', id: typingId }]);
  setInput('');

  setTimeout(() => {
    setMessages(prev => {
      const updated = prev.filter(msg => msg.id !== typingId);
      return updated;
    });

    if (userInput === correctAnswer) {
      // Show all success messages
      success_messages.forEach((msg, i) => {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { sender: 'bot', text: msg, id: Date.now() + i }
          ]);
        }, i * 1000);
      });
      setGameOver(true);
      setShowFireworksGif(true);
    } else {
      const newGuesses = guessesLeft - 1;
      setGuessesLeft(newGuesses);

      if (newGuesses <= 0) {
        // Display all fail messages with answer only in the first
        fail_messages.forEach((msg, i) => {
          const text = i === 0
            ? `${msg} ${app ? `(The correct answer was: "${app}")` : ''}`
            : msg;
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { sender: 'bot', text, id: Date.now() + i }
            ]);
          }, i * 1000);
        });
        setGameOver(true);
      } else {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `Not quite! Try again. You have ${newGuesses} guess${newGuesses === 1 ? '' : 'es'} left.`,
            id: Date.now()
          }
        ]);
      }
    }
  }, 800);
};

  const handleHint = () => {
    if (hintIndex < hints.length) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: hints[hintIndex], id: Date.now() },
      ]);
      setHintIndex(hintIndex + 1);
    }
  };

  const goBackHome = () => {
    navigate('/');
  };

  if (!location.state) {
    return null;
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-card">
        <div className="story-title">{title}</div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="profile-bubble">
                  <img src={preplexity} alt="bot-logo" />
                </div>
              )}
              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        {!gameOver ? (
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your answer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              autoFocus
              aria-label="Answer input"
            />
            <button onClick={handleSend} aria-label="Send answer">Send</button>
            <button
              className="hint-btn"
              onClick={handleHint}
              disabled={hintIndex >= hints.length}
              title={hintIndex >= hints.length ? "No more hints" : "Show Hint"}
              aria-label="Show hint"
            >
              <FaLightbulb />
            </button>
          </div>
        ) : (
         <button className="back-home-btn" onClick={goBackHome} aria-label="Back to home">
  <img src={backIcon} alt="Back" className="back-icon" />
  <span>Back Home</span>
</button>

        )}
      </div>

      <div className="image-card">
        <div className={`image-wrapper ${!gameOver ? 'blurred' : ''}`}>
          <img src={image} alt="Story Visual" />
        </div>
      </div>

      {showFireworksGif && (
        <div className="fireworks-container">
          <img src={fireworksGif} alt="Fireworks celebration" />
        </div>
      )}
    </div>
  );
};

export default Chat;
