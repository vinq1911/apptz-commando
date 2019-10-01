import React, { useContext } from 'react';
import '../styles/DashBoard.css';
import '../styles/StyleHorizontal.css';
import Users from './Users';
import Groups from './Groups';
import ProfileCard from './ProfileCard';
import StateContext from '../StateMachine';
import AddUserCard from './AddUserCard';
import AddGroupCard from './AddGroupCard';
import BillingTools from './BillingTools';

function Cards() {
  return (<div>Cards</div>);
}
function GroupList() {
  return (<Groups />);
}

function BillingList() {
  return (<div>Billing list</div>);
}
function CardList() {
  return (<div>Card list</div>);
}
function CardSettings() {
  return (<div>Card settings</div>);
}


function UserList() {
  return (<Users />);
}

function UserSettings() {
  return (<AddUserCard />);
}
function BillingSettings() {
  return (<BillingTools />);
}
function GroupSettings() {
  return (<AddGroupCard />);
}

function Mainmenu() {
  return (<div>Main menu</div>);
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
            <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({selectedElements: {}}); context.rootcb('refreshData');  }}>
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
    case 'cards':
      return(
        <ul className="left" id="ul-horizontal-nav" data-menu="menu-navigation">
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({dashMenuParadigm: 'default' }); props.clickAction(e, Mainmenu); }}>
              <i className="material-icons">dashboard</i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="active">
            <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, CardList) }}>
              <i className="material-icons">assignment</i>
              <span>Cards</span>
            </a>
          </li>
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({selectedElements: {}}); context.rootcb('refreshData');  }}>
              <i className="material-icons">replay</i>
              <span>Reload</span>
            </a>
          </li>
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, CardSettings) }}>
              <i className="material-icons">note_add</i>
              <span>Card tools</span>
            </a>
          </li>
        </ul>);
    break;
    case 'billing':
      return(
        <ul className="left" id="ul-horizontal-nav" data-menu="menu-navigation">
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({dashMenuParadigm: 'default' }); props.clickAction(e, Mainmenu); }}>
              <i className="material-icons">dashboard</i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="active">
            <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, BillingList) }}>
              <i className="material-icons">account_balance_wallet</i>
              <span>Billing</span>
            </a>
          </li>
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { context.rootcb('refreshBillingData');  }}>
              <i className="material-icons">replay</i>
              <span>Reload</span>
            </a>
          </li>
          <li>
            <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, BillingSettings) }}>
              <i className="material-icons">add_shopping_cart</i>
              <span>Billing tools</span>
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
            <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({selectedElements: {}}); context.rootcb('refreshData');  }}>
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
          <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({dashMenuParadigm: 'cards' }); props.clickAction(e, CardList); }}>
            <i className="material-icons">assignment</i>
            <span>Cards</span>
          </a>
          </li>
          <li>
          <a className="dropdown-menu" href="#" onClick={(e) => { context.dispatch({dashMenuParadigm: 'billing' }); props.clickAction(e, BillingList); }}>
            <i className="material-icons">account_balance_wallet</i>
            <span>Billing</span>
          </a>
        </li>
      </ul>);
  }
  return;
}

export default DashMenuList;
