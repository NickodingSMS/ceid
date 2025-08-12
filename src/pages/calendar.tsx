"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [event, setEvent] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Responsive sizing: use 90vw/90vh for mobile, 60vw/80vh for desktop
  const [containerStyle, setContainerStyle] = useState({});

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setContainerStyle({
          width: "78vw",
          height: "70vh",
        });
      } else {
        setContainerStyle({
          width: "69vw",
          height: "69vh",
          
        });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDateClick = (value: Date) => {
    setSelectedDate(value);
    setDate(value);
    setEvent("");
  };

  const handleSaveEvent = () => {
    if (selectedDate && event.trim()) {
      console.log({
        date: selectedDate.toDateString(),
        event: event.trim(),
      });
      setEvent("");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "flex-start", // changed from "center"
        justifyContent: "center",
        paddingTop: "3rem", // add your desired top space here
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          ...containerStyle,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          borderRadius: "3rem",
          boxShadow: "0 16px 48px 0 rgba(31, 38, 135, 0.27)",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.3s",
          overflow: "auto",
          marginTop: "7vh",
        }}
      >
        <Calendar
          value={date}
          onChange={setDate}
          onClickDay={handleDateClick}
          style={{
            width: "100%",
            height: "100%",
            fontSize: "1.2rem",
            borderRadius: "2rem",
            border: "none",
            background: "transparent",
          }}
        />
        {selectedDate && (
          <div
            style={{
              background: "#fff",
              color: "#222",
              
              padding: "1.2rem",
              borderRadius: "1.5rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              textAlign: "center",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <p>
              Selected: <strong>{selectedDate.toDateString()}</strong>
            </p>
            <input
              type="text"
              placeholder="Event description"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginRight: "0.5rem",
                width: "60%",
              }}
            />
            <button
              type="button"
              onClick={handleSaveEvent}
              style={{
                padding: "0.5rem 1.2rem",
                background: "#6ee7b7",
                color: "#222",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}