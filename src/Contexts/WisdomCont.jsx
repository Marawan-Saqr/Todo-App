import React, { useState, createContext, useEffect } from "react";

const wisdomName = createContext();

const WisdomContextProvider = ({ children }) => {
  const [wisdom, setWisdom] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Change wisdom message
  const changeWisdom = (nameWisdom) => {
    setWisdom(nameWisdom);
  };

  // Show pop-up every 3 minutes (600000 ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setShowPopup(true);
    }, 300000);

    // Clean up the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  // Close the popup manually
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <wisdomName.Provider value={{ wisdom, changeWisdom, showPopup, closePopup }}>
      {children}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{wisdom || "توكل وسيبها على الله متفكرش كتير ربك كبير"}</p>
            <button onClick={closePopup}>اغلاق</button>
          </div>
        </div>
      )}
    </wisdomName.Provider>
  );
};



export { wisdomName, WisdomContextProvider };