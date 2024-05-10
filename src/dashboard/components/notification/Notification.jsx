import React, { useState } from "react";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { useDispatch } from "react-redux";

//
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";

const Notification = () => {
  const dispatch = useDispatch();
  // Push Notifications
  const [topup, setTopUp] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [buy, setBuy] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  // Email
  const [topups, setTopUps] = useState(false);
  const [withdraws, setWithdraws] = useState(false);
  const [transfers, setTransfers] = useState(false);
  const [buys, setBuys] = useState(false);
  const [newsletters, setNewsletters] = useState(false);

  // disable push notifications
  const disablePush = () => {
    setTopUp(false);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { notify: "Push notification disabled" },
    });

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    }, 3000);
  };
  const enablePush = () => {
    setTopUp(true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { notify: "Push notification enabled" },
    });

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    }, 3000);
  };

  return (
    <div className="notifications">
      <h3>Notification Settings</h3>

      <div className="notification-table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Notification type</th>
              <th scope="col">Push Notifications</th>
              <th scope="col">Email Alert</th>
            </tr>
          </thead>

          <tbody style={{ border: "0" }}>
            <tr>
              <td>Topup wallet</td>
              <td>
                {topup ? (
                  <BsToggle2On
                    onClick={disablePush}
                    className="toggle-style-on"
                  />
                ) : (
                  <BsToggle2Off
                    onClick={enablePush}
                    className="toggle-style-off"
                  />
                )}
              </td>

              <td>
                {topups ? (
                  <BsToggle2On
                    onClick={() => setTopUps(false)}
                    className="toggle-style-on"
                  />
                ) : (
                  <BsToggle2Off
                    onClick={() => setTopUps(true)}
                    className="toggle-style-off"
                  />
                )}
              </td>
            </tr>

            <tr>
              <td>Withdrawal</td>
              <td>
                {withdraw ? (
                  <BsToggle2On
                    onClick={() => setWithdraw(false)}
                    className="toggle-style-on"
                  />
                ) : (
                  <BsToggle2Off
                    onClick={() => setWithdraw(true)}
                    className="toggle-style-off"
                  />
                )}
              </td>
              <td>
                {withdraws ? (
                  <BsToggle2On
                    onClick={() => setWithdraws(false)}
                    className="toggle-style-on"
                  />
                ) : (
                  <BsToggle2Off
                    onClick={() => setWithdraws(true)}
                    className="toggle-style-off"
                  />
                )}
              </td>
            </tr>

            <tr>
              <td>Transfer</td>
              <td>
                {transfer ? (
                  <BsToggle2On
                    onClick={() => setTransfer(false)}
                    className="toggle-style-on"
                  />
                ) : (
                  <BsToggle2Off
                    onClick={() => setTransfer(true)}
                    className="toggle-style-off"
                  />
                )}
              </td>
              <td>
                {transfers ? (
                  <BsToggle2On
                    onClick={() => setTransfers(false)}
                    className="toggle-style-on"
                  />
                ) : (
                  <BsToggle2Off
                    onClick={() => setTransfers(true)}
                    className="toggle-style-off"
                  />
                )}
              </td>
            </tr>

            <tr>
              <td>Buy or Sell</td>
              <td>
                {buy ? (
                  <BsToggle2On
                    onClick={() => setBuy(false)}
                    className="toggle-style-on"
                  />
                ) : (
                  <BsToggle2Off
                    onClick={() => setBuy(true)}
                    className="toggle-style-off"
                  />
                )}
              </td>
              <td>
                {buys ? (
                  <BsToggle2On
                    onClick={() => setBuys(false)}
                    className="toggle-style-on"
                  />
                ) : (
                  <BsToggle2Off
                    onClick={() => setBuys(true)}
                    className="toggle-style-off"
                  />
                )}
              </td>
            </tr>

            <tr>
              <td>Newsletter</td>
              <td>
                {newsletter ? (
                  <BsToggle2On
                    onClick={() => setNewsletter(false)}
                    className="toggle-style-on"
                  />
                ) : (
                  <BsToggle2Off
                    onClick={() => setNewsletter(true)}
                    className="toggle-style-off"
                  />
                )}
              </td>
              <td>
                {newsletters ? (
                  <BsToggle2On
                    onClick={() => setNewsletters(false)}
                    className="toggle-style-on"
                  />
                ) : (
                  <BsToggle2Off
                    onClick={() => setNewsletters(true)}
                    className="toggle-style-off"
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notification;
