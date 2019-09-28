import React, { useContext } from 'react';
import '../styles/DashBoard.css';
import '../styles/StyleHorizontal.css';
import Users from './Users';
import StateContext from '../StateMachine';
import DashMenuList from './DashMenuList';


export const DashMenu = (props) => {

  const context = useContext(StateContext);
  return ( <nav className="white" id="horizontal-nav">
          <div className="nav-wrapper">
              <DashMenuList clickAction={props.clickAction} />
          </div></nav>);
}

const Header = (props) => {
  const context = useContext(StateContext);
  return (
    <header className="page-topbar" id="header">
      <div className="navbar navbar-fixed">
        <nav className="navbar-main navbar-color nav-collapsible sideNav-lock navbar-dark gradient-45deg-indigo-purple no-shadow">
          <div className="nav-wrapper">
            <ul className="left">
              <li>
                <h1 className="logo-wrapper">
                  <a className="brand-logo darken-1" href="/">
                    <img src={context.state.logoImg} alt="logo" />
                    <span className="logo-text hide-on-med-and-down"></span>
                  </a>
                </h1>
              </li>
            </ul>
            <div className="header-search-wrapper">
              <i className="material-icons">search</i> <input className="header-search-input z-depth-2" type="text" name="Search" placeholder="search" onChange={(e) => {context.dispatch({searchTerm: e.target.value}); }} value={context.state.searchTerm}/>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};





export function DashBoard(props) {

  const context = useContext(StateContext);
  let searchTerm = context.state.searchTerm;
  const logoImg = context.state.logoImg;

  const searchFunction = (searchTerm) => {
    context.dispatch({searchTerm: searchTerm});
  };

  const clickAction = (e, act) => {
    e.preventDefault();
    console.log(act);
    context.state.changeMenuParadigm(act);
  };


  return (
    <div>
      <Header />
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
