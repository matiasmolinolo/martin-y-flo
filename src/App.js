import './App.css';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 1 },
    });
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.keys(newTimeLeft).length === 0 && newTimeLeft.constructor === Object) {
        triggerConfetti();
        setShow(false);
      }
      else {
        setShow(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTimePart = (timePart) => {
    // Ensure the time part is at least two digits
    return timePart.toString().padStart(2, '0');
  };


  return (
    <div className="App">
      <header className="App-header">
        {show && <h1>Martucho & Flo</h1>}
        {show && Object.keys(timeLeft).length > 0 && (
          <div>
            <h2>Faltan:</h2>
            <p>
              {formatTimePart(timeLeft.days)}:
              {formatTimePart(timeLeft.hours)}:
              {formatTimePart(timeLeft.minutes)}:
              {formatTimePart(timeLeft.seconds)}
            </p>
          </div>
        )}
        {!show && (
          <h1>Congrats Martucho y Flo!</h1>
        )}
        {!show && (
          <h1>🤵🏻‍♂️👰🏻‍♀️</h1>
        )}
      </header>
    </div>
  );
};



function App() {
  const targetDate = '2024-02-01T21:20:30';
  return (
    <Countdown targetDate={targetDate} />
  );
}

export default App;
