import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const formHandle = async (e) => {
    e.preventDefault();
    let hasError = false;
    if (userName === "") {
      setUserNameError("Insert user name");
      hasError = true;
    }
    if (password === "") {
      setPasswordError("Insert password");
      hasError = true;
    }
    if (email === "") {
      setEmailError("Insert email");
      hasError = true;
    }
    if (phoneNumber === "") {
      setPhoneNumberError("Insert phone number");
      hasError = true;
    }

    if (!hasError) {
      const data = { userName, password, email, phoneNumber };
      await axios
        .post("http://localhost:5000/register", data)
        .then(() => {
          console.log("Data Submitted Successfully");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const loginHandle = () => {
    navigate("/");
  };
  return (
    <div className="App p-5 d-flex justify-content-center align-items-center flex-column">
      <h1 className="pb-3">SIGN Up</h1>
      <form className="d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center flex-column gap-2 w-75">
          <input
            className={`rounded ${userNameError ? "is-invalid" : ""}`}
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          {userNameError && (
            <div className="invalid-feedback">{userNameError}</div>
          )}
          <input
            className={`rounded ${passwordError ? "is-invalid" : ""}`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {passwordError && (
            <div className="invalid-feedback">{passwordError}</div>
          )}
          <input
            className={`rounded ${emailError ? "is-invalid" : ""}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailError && <div className="invalid-feedback">{emailError}</div>}
          <input
            className={`rounded ${phoneNumberError ? "is-invalid" : ""}`}
            type="text"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          {phoneNumberError && (
            <div className="invalid-feedback">{phoneNumberError}</div>
          )}
          <div className="d-flex justify-content-center align-items-center gap-3">
            <button className="mt-3 rounded" type="submit" onClick={formHandle}>
              SignUp
            </button>
            <button
              className="mt-3 rounded"
              type="submit"
              onClick={loginHandle}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
