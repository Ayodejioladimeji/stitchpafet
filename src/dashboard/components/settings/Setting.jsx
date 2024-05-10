import React, { useState } from "react";
import { useSelector } from "react-redux";

//
import Notification from "./../notification/Notification";
import Security from "./../security/Security";
import BankAccount from "./../bankaccount/BankAccount";
import Referral from "./../referral/Referral";
import Verification from "./../verification/Verification";

//
const Setting = () => {
  const { user } = useSelector((state) => state.auth);
  const [toggleState, setToggleState] = useState(
    user.usertype === "vendor" ? 1 : 2
  );

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="tabcontainer">
      <div className="tabcenter">
        {/* THE SECTION OF THE TABS */}
        <div className="bloctabs">
          {user.usertype === "vendor" && (
            <button
              className={toggleState === 1 ? "activetabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Verification
            </button>
          )}

          <button
            className={toggleState === 2 ? "activetabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Bank Account
          </button>

          <button
            className={toggleState === 3 ? "activetabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Notifications
          </button>

          <button
            className={toggleState === 4 ? "activetabs" : "tabs"}
            onClick={() => toggleTab(4)}
          >
            Security
          </button>

          <button
            className={toggleState === 5 ? "activetabs" : "tabs"}
            onClick={() => toggleTab(5)}
          >
            Referral
          </button>
        </div>

        {/* THE SECTION OF THE CONTENT */}
        <div className="contenttabs">
          {user.usertype === "vendor" && (
            <div className={toggleState === 1 ? "activecontent" : "content"}>
              <Verification />
            </div>
          )}

          <div className={toggleState === 2 ? "activecontent" : "content"}>
            <BankAccount />
          </div>

          <div className={toggleState === 3 ? "activecontent" : "content"}>
            <Notification />
          </div>

          <div className={toggleState === 4 ? "activecontent" : "content"}>
            <Security />
          </div>

          <div className={toggleState === 5 ? "activecontent" : "content"}>
            <Referral />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
