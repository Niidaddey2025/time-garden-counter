
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Input.css";

const Input = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const targetDate = new Date(`${date}T${time || "00:00"}`);
    
    // Ensure the date is valid
    if (isNaN(targetDate.getTime())) {
      alert("Please select a valid date");
      return;
    }

    localStorage.setItem("targetDate", targetDate.toISOString());
    navigate("/");
  };

  return (
    <div className="input-container">
      <form onSubmit={handleStart} className="input-form">
        <h1>Set Target Date & Time</h1>
        <div className="input-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="time">Time (optional)</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button type="submit" className="start-button">
          Start Counter
        </button>
      </form>
    </div>
  );
};

export default Input;
