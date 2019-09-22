import React, { useContext } from 'react';
import '../styles/DashBoard.css';
import '../styles/StyleHorizontal.css';
import Users from './Users';
import StateContext from '../StateMachine';


export const DashMenu = (props) => {

  return ( <nav className="white" id="horizontal-nav">
   <div className="nav-wrapper">
            <ul className="left" id="ul-horizontal-nav" data-menu="menu-navigation">
              <li>
                <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, Mainmenu) }}>
                  <i className="material-icons">dashboard</i>
                  <span>Dashboard</span>
                </a>


              </li>
              <li>
              <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, UserList) }}>
                <i className="material-icons">person</i>
                <span>Users</span>
              </a>
              </li><li>
              <a className="dropdown-menu" href="#" onClick={(e) => { props.clickAction(e, Groups) }}>
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

            </ul>
          </div></nav>);
}

const Header = (props) => {
  return (
    <header className="page-topbar" id="header">
      <div className="navbar navbar-fixed">
        <nav className="navbar-main navbar-color nav-collapsible sideNav-lock navbar-dark gradient-45deg-indigo-purple no-shadow">
          <div className="nav-wrapper">
            <ul className="left">
              <li>
                <h1 className="logo-wrapper">
                  <a className="brand-logo darken-1" href="/">
                    <img src={props.logoImg} alt="logo" />
                    <span className="logo-text hide-on-med-and-down"></span>
                  </a>
                </h1>
              </li>
            </ul>
            <div className="header-search-wrapper">
              <i className="material-icons">search</i> <input className="header-search-input z-depth-2" type="text" name="Search" placeholder="search" onSubmit={(e) => {props.searchFunc(e.target.value); }} value={props.searchTerm}/>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

function Cards() {
  return (<div>Cards</div>);
}
function Groups() {
  return (<div>Cards</div>);
}

function Bills() {
  return (<div>Cards</div>);
}


function UserList() {
  return (<Users />);
}

let Mainmenu = () => {}

export function DashBoard(props) {

  Mainmenu = props.mainMenu;
  const context = useContext(StateContext);
  let searchTerm = context.state.searchTerm;
  const logoImg = context.state.logoImg;

  const searchFunction = (searchTerm) => {
    context.dispatch({searchTerm: searchTerm});
  };

  const clickAction = (e, act) => {
    e.preventDefault();
    console.log(act);
    props.mpc(act);
  };

  return (
    <div>
      <Header searchFunc={searchFunction} searchTerm={searchTerm} logoImg={logoImg} />
      <DashMenu clickAction={clickAction} />
      <div className="row">
        <div className="content-wrapper-before blue-grey lighten-5"></div>
        <div className="col s12">
          <div className="container">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
