import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (time) => {
    const milliseconds = `0${time % 1000}`.slice(-3);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / (1000 * 60)) % 60)}`.slice(-2);
    const hours = `0${Math.floor((time / (1000 * 60 * 60)) % 24)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleStartPause = () => {
    if (isStopped) {
      setTime(0);
      setIsStopped(false);
      setIsRunning(true);
    } else {
      setIsRunning((prevIsRunning) => !prevIsRunning);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsStopped(true);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setIsStopped(false);
  };

  return (
    <div className="container-fluid stopwatch-container">
      <div className="stopwatch-display">
        <h1 className="display-4">{formatTime(time)}</h1>
      </div>
      <div className="stopwatch-buttons">
        <button onClick={handleStartPause} className="btn btn-primary">
          {isRunning ? "Pause" : isStopped ? "Resume" : "Start"}
        </button>
        <button onClick={handleStop} className="btn btn-danger">
          Stop
        </button>
        <button onClick={handleReset} className="btn btn-warning">
          Reset
        </button>
      </div>
      <footer className="footer">Made by Divyanshu</footer>
    </div>
  );
};

export default Stopwatch;
