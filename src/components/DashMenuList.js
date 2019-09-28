import React, { useContext } from 'react';
import '../styles/DashBoard.css';
import '../styles/StyleHorizontal.css';
import Users from './Users';
import Groups from './Groups';
import ProfileCard from './ProfileCard';
import StateContext from '../StateMachine';
import AddUserCard from './AddUserCard';
import AddGroupCard from './AddGroupCard';

function Cards() {
  return (<div>Cards</div>);
}
function GroupList() {
  return (<Groups />);
}

function Bills() {
  return (<div>Cards</div>);
}


function UserList() {
  return (<Users />);
}

function UserSettings() {
  return (<AddUserCard />);
}
function GroupSettings() {
  return (<AddGroupCard />);
}

function Mainmenu() {
  return (<ProfileCard />);
}

const DashMenuList = (props) => {

  const context = useContext(StateContext);
  switch (context.state.dashMenuParadigm) {
    case 'users':
      return(
        <ul className="left" id="ul-horizontal-nav" data-menu="menu-navigation">
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({dashMenuParadigm: 'default' }); props.clickAction(e, Mainmenu); }}>
              <i className="material-icons">dashboard</i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="active">
          <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, UserList); }}>
            <i className="material-icons">person</i>
            <span>Users</span>
          </a>
          </li>
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { context.rootcb('refreshData');  }}>
              <i className="material-icons">replay</i>
              <span>Reload</span>
            </a>
          </li>
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, UserSettings) }}>
              <i className="material-icons">account_box</i>
              <span>User settings</span>
            </a>
          </li>
        </ul>);
    break;
    case 'groups':
      return(
        <ul className="left" id="ul-horizontal-nav" data-menu="menu-navigation">
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({dashMenuParadigm: 'default' }); props.clickAction(e, Mainmenu); }}>
              <i className="material-icons">dashboard</i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="active">
          <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, GroupList); }}>
            <i className="material-icons">people</i>
            <span>Groups</span>
          </a>
          </li>
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { context.rootcb('refreshData');  }}>
              <i className="material-icons">replay</i>
              <span>Reload</span>
            </a>
          </li>
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, GroupSettings) }}>
              <i className="material-icons">account_box</i>
              <span>Group settings</span>
            </a>
          </li>
        </ul>);
    break;
    default:
      return (
        <ul className="left" id="ul-horizontal-nav" data-menu="menu-navigation">
          <li className="active">
            <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, Mainmenu) }}>
              <i className="material-icons">dashboard</i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
          <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({dashMenuParadigm: 'users' }); props.clickAction(e, UserList); }}>
            <i className="material-icons">person</i>
            <span>Users</span>
          </a>
          </li><li>
          <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({dashMenuParadigm: 'groups' }); props.clickAction(e, GroupList); }}>
            <i className="material-icons">people</i>
            <span>Groups</span>
          </a>
          </li>
          <li>
          <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, Cards) }}>
            <i className="material-icons">assignment</i>
            <span>Cards</span>
          </a>
          </li>
          <li>
          <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, Bills) }}>
            <i className="material-icons">account_balance_wallet</i>
            <span>Billing</span>
          </a>
        </li>
      </ul>);
  }
  return;
}

export default DashMenuList;
