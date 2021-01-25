import React, { useState, useEffect } from "react";

const UserCanSelectClass = ({ onLogout, id, setSessions }) => {
  const [session, setSession] = useState([]);
  const [sessionSelect, setSessionSelect] = useState(-1);
  const [clicked, setClicked] = useState(false);
  console.log(sessionSelect);
  const onclick = () => {
    fetch(`${process.env.REACT_APP_BACK_END_URL}/users/${id}/class/session`, {
      method: "POST",
      body: JSON.stringify({
        sessionId: sessionSelect,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => setClicked(true));
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_END_URL}/users/${id}/class/session`)
      .then((res) => res.json())
      .then((data) => {
        setSession(data);
      });
  }, [id]);
  console.log(session);
  return (
    <>
      <div>
        <h2 className="select-class">
          Please sign into the session you want to attend
        </h2>
        <h3 className="select-class">Choose a Session:</h3>
        <div className="select-option">
          <select
            value={sessionSelect}
            onChange={(event) => setSessionSelect(event.target.value)}
            disabled={clicked}
          >
            <option value={-1} disabled>
              Please select a session
            </option>
            {session.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="Space">
          <button
            className={clicked ? "Star-clicked" : "Star"}
            onClick={onclick}
          >
            {clicked ? "Attending" : "Log into this class"}
          </button>
        </div>
      </div>
    </>
  );
};
export default UserCanSelectClass;
