import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";


import '../styles/Login.css';

class LoginCard extends React.Component {
    state = {
      userName: '',
      passWord: ''
    };

    onLoginClick = (e) => {
      var un = this.state.userName;
      var pw = this.state.passWord;
      this.props.onSubmit(un, pw, this.props.callBack);
    };

    render() { return (
      <div className="col s12 m6 l4 z-depth-4 card-panel border-radius-6 login-card bg-opacity-8">
        <form className="login-form">
          <div className="row">
            <div className="input-field col s12">
              <h5 className="ml-4">Sign in</h5>
            </div>
          </div>
          <div className="row margin">
            <div className="input-field col s12">
              <i className="material-icons prefix pt-2">person_outline</i>
              <input id="username" type="text" value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})}/>
              <label htmlFor="username" className="center-align">Username</label>
            </div>
          </div>
          <div className="row margin">
            <div className="input-field col s12">
              <i className="material-icons prefix pt-2">lock_outline</i>
              <input id="password" type="password" value={this.state.passWord} onChange={(e) => this.setState({passWord: e.target.value})}/>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12 l12 ml-2 mt-1">
              <p>
                <label>
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <Link to="/" onClick={this.onLoginClick} className="btn waves-effect waves-light border-round gradient-45deg-purple-deep-orange col s12">Login</Link>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6 m6 l6">
              <p className="margin medium-small"><a href="user-register.html">Register Now!</a></p>
            </div>
            <div className="input-field col s6 m6 l6">
              <p className="margin right-align medium-small"><a href="user-forgot-password.html">Forgot password ?</a></p>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default LoginCard;
