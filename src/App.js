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
import M from 'materialize-css';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';


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
  // console.log(apptzState);
  axios.get(`${ApptzConfig.endpoint}/${ApptzConfig.base}/passwordAuth/${password}/${username}`)
    .then(res => {cb(res);});
};

const setToken = (res) => {
  // console.log(res);
  if (res.data.puid >= apptzState.apiUid) {
    apptzState.bearerToken = res.data.secret;
    apptzState.authUid = res.data.uid;
    apptzState.apiUid = res.data.puid;
    apptzState.isLoggedIn = true;

  } else {
    apptzState.isLoggedIn = false;
  }
  apptzState.registerLogin(apptzState);
  // console.log(apptzState);
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
  };

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
      <DashBoard>
        <div className="row">
          {this.handleParadigm()}
        </div>
      </DashBoard>
    );
  };
  UserSettings = () => {
    return (
      <div> UserSettings </div>
    );
  };

  initialState = {
    menuParadigm: () => {
      return (
        <div>&nbsp;</div>
      );
    },
    searchTerm: '',
    selectedElements: {},
    adduserform: {useremail: '', userpassword: '', userphone: '', username: '', userbillingemail: '', useridnumber: '', userbd: '', useraddress: '', userzip: '', usercity: '', usercountry: '', usernotes: ''},
    addBillingData: {productRow: '', taxRow: '', priceRow: '', dueDateRow: (new Date())},
    addgroupform: {groupemail: '', groupphone: '', groupname: ''},
    addbillform: {billidentifier: ''},
    groupData: {},
    itemData: {},
    adminData: {},
    billTemplateData: {},
    billData: {},
    billingData: {},
    fileList: [],
    addUserCard: false,
    userData: {},
    dragDropTargets: [],
    changeMenuParadigm: (mi) => {
      // console.log("main mpc fired");
      this.setState({menuParadigm: mi});
      // console.log(mi);
    },
    profileData: { userTest: 'brock' },
    apptzAxios: null,
    endPointRegistered: false,
    ...apptzState,
    ...ApptzConfig
  };

  state = this.initialState;

  dispatch = (action) => {
    // console.log("action!");
    this.setState({...action});
  };

  switchBool = (stateBool) => {
    // console.log("switching bool");
    // console.log(this.state[stateBool]+"->"+!this.state[stateBool]);
    this.setState({[stateBool]: !this.state[stateBool]});
  }

  rootCallback = (action, params = false) => {
    // console.log("root cb "+action);
    var cb = () => { // console.log("fail");
    };
    var addUserCard = this.state.addUserCard;
    switch (action) {
      case 'instantChange':
        cb = (fieldData) => {
          Axios.post('/changeData', { fieldData }).then(res => {
            // console.log(res);
          });
        };
      break;
      case 'addGroup':
        cb = () => {
          Axios.post('/createGroup', {...this.state.addgroupform}).then(res => {
            if (res.data.status == 'success') {
              this.setState({addgroupform: this.initialState.addgroupform, snackBarMessage: "Group created successfully."});
              this.rootCallback('refreshData');
            } else {
              this.setState({ snackBarMessage: "Group creation failed." });
            }
            console.log(res);
          });
        };
      break;
      case 'sendFile':
        cb = (params) => {
          Axios.post('/sendFile', params,{ headers: {
      'Content-Type': 'multipart/form-data'
    }}).then(res => {
            // console.log(res);
          });
        };
      break;
      case 'assignBill':
        cb = (props) => {
          const sendTo = this.state.selectedElements;
          const billData = this.state.billingData[props];
          console.log(this.state.addBillingData);
          const billDue = this.state.addBillingData[props].dueDateRow;
          Axios.post('/assignBill', {sendto: sendTo, billtemplate: props, duedate: billDue}).then(res => {
            this.rootCallback('refreshBillingData');
          });
        };
      break;
      case 'addUser':
        cb = () => {
          Axios.post('/createUser', {...this.state.adduserform}).then(res => {
            if (res.data.status == 'success') {
              this.setState({adduserform: this.initialState.adduserform});
              // console.log("user added");
              // console.log(res);
              this.setState({ snackBarMessage: "User added succesfully." });
            } else {
              // console.log("user add failed");
              // console.log(res);
              this.setState({ snackBarMessage: "User creation process failed." });
            }
            this.rootCallback('refreshData');
            this.setState({ snackBarOpen: true });
          });
          // console.log("adfinhg user")
        };
        break;
      case 'initialSync':
        this.profileRequest();
        this.rootCallback('refreshData');
        this.rootCallback('refreshBillingData');
        break;
      case 'refreshData':
        cb = () => { Axios.post('/getData', {}).then((res) => {
          var tmpUd = [];
          var tmpGd = [];
          var tmpId = [];
          res.data.userData.forEach((userd) => { tmpUd[userd['id']] = userd });
          res.data.groupData.forEach((groupd) => { tmpGd[groupd['id']] = groupd });
          res.data.itemData.forEach((itemd) => { tmpId[itemd['id']] = itemd });

          this.setState({ userData: tmpUd, groupData: tmpGd, itemData: res.data.tmpId, adminData: res.data.adminData});
          console.log(res);
          // console.log("updated data");
        }); };
        break;
      case 'addCustomField':
        cb = () => { Axios.post('/createField', params).then((res) => { this.setState(...res); })};
        break;
      case 'switchAddUser':
        cb = () => this.switchBool('addUserCard');
        break;
      case 'refreshBillingData':
        this.setState({ snackBarMessage: "Loading current billing data..." });
        cb = () => {
          Axios.get('/getBillingData').then((res) => {
            console.log(res);
            this.setState({ snackBarMessage: "Billing data loading complete." });

            var _billingdata = {};
            var _billtemplates = {};
            Object.keys(res.data.billtemplates).map(key => { _billingdata[res.data.billtemplates[key].lb_id] = {}; _billtemplates[res.data.billtemplates[key].lb_id] = res.data.billtemplates[key]});
            Object.keys(res.data.billingdata).map(key => { _billingdata[res.data.billingdata[key].lbl_lb_id][res.data.billingdata[key].lbl_id] = res.data.billingdata[key]});

            this.setState({billingData: _billingdata});
            this.setState({billTemplateData: _billtemplates});
            console.log(this.state.billingData);
            console.log(this.state.billTemplateData);
          });
        };
        this.setState({ snackBarOpen: true });
        break;
      case 'removeBillTemplate':
        cb = (props) => {
          Axios.post('/removeBillIdentifier', {billidentifier: props}).then(res => {
            console.log(res);
            this.rootCallback('refreshBillingData');
          });
        };
        break;
      case 'reloadUserData':
        cb = () => { // console.log("reloading userdata now");
        };
        break;
      case 'addBillTemplate':
        cb = () => {
          Axios.post('/addBillIdentifier', this.state.addbillform).then((res) => {
            console.log(res);
            this.setState({ snackBarMessage: "Bill template created." });
            this.rootCallback('refreshBillingData');
          });
        }

      break;
      case 'markPaid':
        cb = (props) => {
          Axios.post('/markBillPaid', {id: props}).then(res => {
            console.log(res);
          });
        }
      break;
      case 'sendBill':
        cb = (props) => {
          Axios.post('/sendBill', {id: props}).then(res => {
            console.log(res);
          });
        }
      break;
      case 'getPdfBill':
        cb = (props) => {
          Axios.post('/getPdfBill', {id: props}).then(res => {
            console.log(res);
          });
        }
      break;
      case 'removeBillRow':
        cb = (props) => {
          Axios.post('/removeBillRow', {id: props}).then(res => {
            if (res.data.status == "success") {
              console.log(res);
              this.rootCallback('refreshBillingData');
            }
          });
        }

      break;
      case 'addBillRow':
        cb = (props) => {
          Axios.post('/addBillRow', {id: props, data: this.state.addBillingData[props]}).then(res => {
            if (res.data.status == "success") {
              this.rootCallback('refreshBillingData');
            }
            console.log(res);
          });
        };
      break;
      case 'changeTempBillingInfo':
        cb = (props) => {
          var abd = this.state.addBillingData;
          abd[props.id] = props.data;
          this.setState({ addBillingData: abd });
        };
      break;
      case 'removeFromGroup':

      // console.log(params);
        cb = (params) => {
          this.setState({ snackBarMessage: "Removing from group..." });
          Axios.post('/removeFromGroup', {...params}).then(res => {
            // console.log(res);
            this.setState({ snackBarMessage: "Removal process failed." });
            if (res.data.status == "success") {
              this.setState({ snackBarMessage: "Removed successfully." });
            }
            this.rootCallback('refreshData');
          });
          this.setState({ snackBarOpen: true });
        }
        break;
      case 'removeGroup':
        cb = (params) => {
          this.setState({ snackBarMessage: "Group detach processing..." });
          Axios.post('/removeGroup', {groupId: params}).then(res => {
            // console.log(res);
            this.setState({ snackBarMessage: "Group detach process failed." });
            if (res.data.status == "success") {
              this.setState({ snackBarMessage: "Group detached successfully." });
            }
            this.rootCallback('refreshData');
          });
          this.setState({ snackBarOpen: true });
        }
        break;
      case 'saveUser':
        cb = (params) => {
          this.setState({ snackBarMessage: "User modification started." });
          Axios.post('/saveUser', {...params}).then(res => {
            console.log(res);
            if (res.data.status == "success") {
              this.setState({ snackBarMessage: "User information modified." });
            } else {
              this.setState({ snackBarMessage: "User information modification failed."});
            }
          });
          this.setState({ snackBarOpen: true });
        };
        break;
      case 'removeUser':
        cb = (params) => {
          this.setState({ snackBarMessage: "User detach processing...." });
          Axios.post('/removeUser', {userId: params}).then(res => {
            console.log(res);
            this.setState({ snackBarMessage: "User detach process failed." });
            if (res.data.status == "success") {
              this.setState({ snackBarMessage: "User detached successfully." });
            }
            this.rootCallback('refreshData');
          });
          this.setState({ snackBarOpen: true });
        }
        break;
      case 'addToGroup':
        cb = (params) => {
          // console.log("adding to group "+params+" now"); // console.log(this.state.selectedElements);
          Axios.post('/addToGroup', { toGroup: params, addUsers: this.state.selectedElements }).then(res => {
            // console.log(res);
            this.rootCallback('refreshData');
          });
        };
        break;
      default:
        cb = () => { // console.log("no cb present");
        };
    }
    cb(params);
  }

  registerEndpoint = () => {
    if (!this.state.endPointRegistered && this.state.isLoggedIn) {
      axios.get(`${ApptzConfig.endpoint}/${ApptzConfig.base}/apptzEndpoints`).then(res => {
        // console.log(res);
        this.setState({ apptzEndpoints: res.data, endPointRegistered: true });
        axios.defaults.baseURL = res.data.api;
        axios.defaults.headers.common['X-Apptz-Apiuid'] = this.state.apiUid;
        axios.defaults.headers.common['X-Apptz-BearerToken'] = this.state.bearerToken;
        axios.defaults.headers.common['X-Apptz-Client'] = this.state.base;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        Axios = axios.create();
        this.rootCallback('initialSync');
      });
    }
    // console.log(this.state);
  }



  registerLogin = (st) => {
    // console.log(st);
    this.setState({...st});
    this.registerEndpoint();
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({snackBarOpen: false});
  };

  useStyles = {};

  componentDidMount() {
    apptzState.registerLogin = this.registerLogin;
    this.useStyles = makeStyles(theme => ({
      close: {
        padding: theme.spacing(0.5),
      },
    }));

  };

  componentWillUnmount() {

  };

  componentDidUpdate() {
    M.updateTextFields();
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
            <PrivateRoute exact path="/settings/user" component={this.UserSettings} />
          </div>
        </Router>
        <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={this.state.snackBarOpen}
        autoHideDuration={6000}
        onClose={this.state.snackBarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.snackBarMessage}</span>}
        action={[

          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={this.useStyles.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />

      </StateContext.Provider>
    );
  }

}

export default App;
