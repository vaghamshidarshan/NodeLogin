import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

const App = () => {
  const [textValue, setTextValue] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [setConsoleError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleTextAreaChange = (event) => {
    setTextValue(event.target.value);
  };

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://192.168.203.176:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: username,
          Password: password,
        }),
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.status === 200) {
            // Login successful
            console.log(resp.message);
            // Show login successful toast
            console.log(resp);
            //setConsoleOutput = resp;
            toast.success("Login Successful!");
            // Clear console output on successful login
            setConsoleOutput("");
            // Set JSON data in consoleError state
            setConsoleError(JSON.stringify(resp.data, null, 2));
            // Redirect or perform other actions
          } else if (resp.status === 400) {
            // Username does not exist or password not matched
            console.error(resp.message);
            // Show error toast
            toast.error(resp.message);
            // Set console output with the error message
            setConsoleOutput(resp.message);
          } else {
            // Other error scenarios
            console.error("Login Failed");
            // Show error toast
            toast.error("Login Failed");
            // Set console output with the error message
            setConsoleOutput("Login Failed");
          }
        })
        .catch((err) => {
          console.error("Login Failed due to: " + err.message);
          // Show error toast
          toast.error("Login Failed due to: " + err.message);
          // Set console output with the error message
          setConsoleOutput("Login Failed due to: " + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  useEffect(() => {
    const updateConsoleErrors = (event) => {
      const errorText = `${event.message} (${event.filename}:${event.lineno}:${event.colno})\n`;
      setConsoleError((prevConsoleError) => prevConsoleError + errorText);
    };

    window.onerror = updateConsoleErrors;

    return () => {
      window.onerror = null;
    };
  }, []);

  return (
    <Router>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form onSubmit={proceedLogin} className="container">
            <div className="card">
              <div className="card-header">
                <h2>User Login</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>
                    User Name <span className="errmsg">*</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Password <span className="errmsg">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>{" "}
                |
                <Link to="/register" className="btn btn-success">
                  New User
                </Link>
              </div>
            </div>
          </form>
          <div className="my-5">
            <h3>API URL</h3>
            <textarea
              value="http://192.168.203.176:3000/user/login"
              rows={1}
              className="form-control"
              readOnly
            />
          </div>
          <div className="my-5">
            <h3>Input Textarea</h3>
            <textarea
              value={textValue}
              onChange={handleTextAreaChange}
              rows={5}
              cols={40}
              className="form-control"
            />
          </div>
          <div className="my-5">
            <h3>Console Output</h3>
            <textarea
              value={consoleOutput}
              rows={5}
              cols={40}
              className="form-control"
              readOnly
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
