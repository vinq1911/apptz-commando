import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import CardPanel from './CardPanel';

function ButtonCard(props) {
  return (
    <CardPanel cardClass={props.btnClass}>
      <div onClick={props.btnCb} className="secondary-content right btn btn-floating btn-small waves-effect waves-light blue white-text">
        <i className="material-icons">{props.btnIcon}</i>
      </div>
      <div className="left">
        {props.children}
      </div>
    </CardPanel>
  );
}

export default ButtonCard;
