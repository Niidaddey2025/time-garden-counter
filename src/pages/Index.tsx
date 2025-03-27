
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Counter.css";

const Index = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const storedDate = localStorage.getItem("targetDate");
    if (!storedDate) {
      navigate("/input");
      return;
    }

    const parsedDate = new Date(storedDate);
    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      console.log("Invalid date:", parsedDate);
      navigate("/input");
      return;
    }

    setIsPast(parsedDate < new Date());
    console.log("Target date set to:", parsedDate);
    setTargetDate(parsedDate);
  }, [navigate]);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      let difference = isPast ? now - target : target - now;

      console.log("Time difference:", difference);

      const msInSecond = 1000;
      const msInMinute = msInSecond * 60;
      const msInHour = msInMinute * 60;
      const msInDay = msInHour * 24;
      const msInWeek = msInDay * 7;
      const msInMonth = msInDay * 30.436875; // Average month length
      const msInYear = msInDay * 365.25; // Account for leap years

      // Calculate years and remaining milliseconds
      const years = Math.floor(difference / msInYear);
      difference = difference % msInYear;

      // Calculate months and remaining milliseconds
      const months = Math.floor(difference / msInMonth);
      difference = difference % msInMonth;

      // Calculate weeks and remaining milliseconds
      const weeks = Math.floor(difference / msInWeek);
      difference = difference % msInWeek;

      // Calculate days and remaining milliseconds
      const days = Math.floor(difference / msInDay);
      difference = difference % msInDay;

      // Calculate hours and remaining milliseconds
      const hours = Math.floor(difference / msInHour);
      difference = difference % msInHour;

      // Calculate minutes and remaining milliseconds
      const minutes = Math.floor(difference / msInMinute);
      difference = difference % msInMinute;

      // Calculate seconds and milliseconds
      const seconds = Math.floor(difference / msInSecond);
      const milliseconds = difference % msInSecond;

      setTimeLeft({
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
      });
    };

    calculateTimeLeft(); // Calculate immediately
    const timer = setInterval(calculateTimeLeft, 10);
    return () => clearInterval(timer);
  }, [targetDate, isPast]);

  return (
    <div className="counter-container">
      <h2 className="counter-title">
        Time {isPast ? "Elapsed Since" : "Until"} Target Date
      </h2>
      <div className="counter-grid">
        <div className="time-card">
          <span className="time-value">{timeLeft.years}</span>
          <span className="time-label">Years</span>
        </div>
        <div className="time-card">
          <span className="time-value">{timeLeft.months}</span>
          <span className="time-label">Months</span>
        </div>
        <div className="time-card">
          <span className="time-value">{timeLeft.weeks}</span>
          <span className="time-label">Weeks</span>
        </div>
        <div className="time-card">
          <span className="time-value">{timeLeft.days}</span>
          <span className="time-label">Days</span>
        </div>
        <div className="time-card">
          <span className="time-value">{timeLeft.hours}</span>
          <span className="time-label">Hours</span>
        </div>
        <div className="time-card">
          <span className="time-value">{timeLeft.minutes}</span>
          <span className="time-label">Minutes</span>
        </div>
        <div className="time-card">
          <span className="time-value">{timeLeft.seconds}</span>
          <span className="time-label">Seconds</span>
        </div>
        <div className="time-card">
          <span className="time-value">{timeLeft.milliseconds}</span>
          <span className="time-label">Milliseconds</span>
        </div>
      </div>
      <button className="reset-button" onClick={() => navigate("/input")}>
        Reset Counter
      </button>
    </div>
  );
};

export default Index;
