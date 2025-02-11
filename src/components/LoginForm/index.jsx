import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import { Component } from "react";
import "./index.css";

class LoginForm extends Component {
  state = { username: "", password: "", loginError: false, errorMsg: "" };

  onSubmitSuccess = (jwtToken) => {
    // Navigate to the HomePage

    Cookies.set("jwt_token", jwtToken, {
      expires: 7,
    });

    const { history } = this.props;

    // history.push("/");
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ loginError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    const URL = "https://apis.ccbp.in/login";

    const userData = {
      username,
      password,
    };

    const options = {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   Accept: "application/json",
      // },
      body: JSON.stringify(userData),
    };

    // fetch (url, options)
    // options = {headers: {}, body: JSON string}

    const response = await fetch(URL, options);
    const data = await response.json();

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onChangeUsernameInput = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePasswordInput = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { username, password, loginError, errorMsg } = this.state;
    const token = Cookies.get("jwt_token");

    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <main>
        <section className="form-section">
          <div className="form-section-content">
            <img
              className="mydas-logo"
              src="https://res.cloudinary.com/dkoqbt4pc/image/upload/v1726574131/mydas-shopping-logo.png"
              alt="mydas-logo"
            />
            <h1>
              Hey,
              <br />
              you can login here!
            </h1>

            <div className="google-con">
              <img
                src="https://res.cloudinary.com/dkoqbt4pc/image/upload/v1726657793/google-logo.png"
                alt="google-logo"
              />
              <button>Sign-in with Google</button>
            </div>

            <form onSubmit={this.submitForm}>
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                id="username"
                placeholder="testing@gmail.com"
                onChange={this.onChangeUsernameInput}
                value={username}
              />

              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                placeholder="Min. 8 characters"
                onChange={this.onChangePasswordInput}
                value={password}
              />

              <button className="forgot-password-btn">Forgot Password?</button>

              <button className="login-btn" type="submit">
                Login
              </button>

              {loginError && <p className="error-text">*{errorMsg}</p>}
            </form>
          </div>
        </section>

        <section className="banner-section">
          <img
            src="https://res.cloudinary.com/dkoqbt4pc/image/upload/v1727198188/woman-blocking-light.jpg"
            alt="woman-blocking-light"
          />
        </section>
      </main>
    );
  }
}

export default LoginForm;

// Hanging Hats: https://res.cloudinary.com/dkoqbt4pc/image/upload/v1727198151/hanging-hats.jpg
// Woman Blocking Light: https://res.cloudinary.com/dkoqbt4pc/image/upload/v1727198188/woman-blocking-light.jpg
// Bottles and Photos: https://res.cloudinary.com/dkoqbt4pc/image/upload/v1727198218/bottles-and-photos.jpg
