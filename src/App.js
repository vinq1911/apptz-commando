import React from 'react';
import Api from './components/Api';
import Menu from './components/Menu';
import LoginCard from './components/LoginCard';
import {DashBoard, DashMenu} from './components/DashBoard';
import ApptzConfig from './Apptzconfig';
import GeneralCard from './components/GeneralCard';
import ProfileCard from './components/ProfileCard';
import StateContext from './StateMachine';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";



function Login(props) {
  return (
    <div className="row">
      <div className="col s12">
        <div className="container">
          <div id="login-page" className="row">
            <LoginCard onSubmit={getToken} callBack={setToken} />
          </div>
        </div>
      </div>
    </div>
  );
}


const apptzState = {
  isLoggedIn: false,
  bearerToken: '',
  authUid: null,
  apiUid: null,
  registerLogin: () => {},
};

const getToken = (username, password, cb) => {
  console.log(apptzState);
  axios.get(`${ApptzConfig.endpoint}/${ApptzConfig.base}/passwordAuth/${password}/${username}`)
    .then(res => {cb(res);});
};

const setToken = (res) => {
  console.log(res);
  if (res.data.puid >= apptzState.apiUid) {
    apptzState.bearerToken = res.data.secret;
    apptzState.authUid = res.data.uid;
    apptzState.apiUid = res.data.puid;
    apptzState.isLoggedIn = true;
  } else {
    apptzState.isLoggedIn = false;
  }
  apptzState.registerLogin(apptzState);
  console.log(apptzState);
};

function LoginRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !apptzState.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        apptzState.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}



let Axios = null;

class App extends React.Component {

  profileRequest = () => {
    Axios.post('/profile', {posttest: 'testing'}).then((res) => { this.setState({...this.state, profileData: res.data}) });
  }

  mainMenu = () => {
    return (
      <ProfileCard />
    );
  }

  handleParadigm = () => {
    var Pcomponent = this.state.menuParadigm;
    return (
      <div>
      {Pcomponent()}
      </div>
    );
  }

  Private = () => {
    return (
      <DashBoard mpc={this.changeMenuParadigm} logoImg={this.state.logoImg} mainMenu={this.mainMenu}>
        <div className="row">
          {this.handleParadigm()}
        </div>
      </DashBoard>
    );
  };

  initialState = {
    userData: {},
    profileData: { userTest: 'brock' },
    apptzAxios: null,
    endPointRegistered: false,
    menuParadigm: this.mainMenu,
    ...apptzState,
    ...ApptzConfig
  };

  state = this.initialState;

  dispatch = (action) => {
    console.log("action!");
    this.setState({...action});
  };

  rootCallback = (action) => {
    console.log("root cb");
    var cb = () => { console.log("fail"); };
    switch (action) {
      case 'reloadUserData':
        cb = () => { console.log("reloading userdata now"); };
        break;
      case 'addUser':
        cb = () => { console.log("adding new user now"); };
        break;
      default:
        cb = () => { console.log("no cb present"); };
    }
    cb();
  }

  registerEndpoint = () => {
    if (!this.state.endPointRegistered && this.state.isLoggedIn) {
      axios.get(`${ApptzConfig.endpoint}/${ApptzConfig.base}/apptzEndpoints`).then(res => {
        console.log(res);
        this.setState({ apptzEndpoints: res.data, endPointRegistered: true });
        axios.defaults.baseURL = res.data.api;
        axios.defaults.headers.common['X-Apptz-Apiuid'] = this.state.apiUid;
        axios.defaults.headers.common['X-Apptz-BearerToken'] = this.state.bearerToken;
        axios.defaults.headers.common['X-Apptz-Client'] = this.state.base;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        Axios = axios.create();
        this.profileRequest();
      });
    }
    console.log(this.state);
  }



  registerLogin = (st) => {
    console.log(st);
    this.setState({...st});
    this.registerEndpoint();
  }

  changeMenuParadigm = (mi) => {
    console.log("main mpc fired");
    this.setState({menuParadigm: mi});
    console.log(mi);
    console.log(this);
  }


  componentDidMount() {
    apptzState.registerLogin = this.registerLogin;
  }

  render() {
    const state = this.state;
    const dispatch = this.dispatch;
    const rootCallback = this.rootCallback;
    return (
      <StateContext.Provider value={{state: state, dispatch: dispatch, rootcb: rootCallback}}>
        <Router>
          <div>
            <LoginRoute path="/login" component={Login} />
            <PrivateRoute exact path="/" component={this.Private} />
          </div>
        </Router>
      </StateContext.Provider>
    );
  }

}

export default App;
