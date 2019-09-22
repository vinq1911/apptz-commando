import React, { useContext } from 'react';
import StateContext from '../StateMachine';

function ButtonCard(props) {
  return (
    <div className="card-panel gradient-45deg-light-blue-cyan gradient-shadow">
      <div className="row">
        <div className="col s12">
          <div onClick={props.btnCb} className="secondary-content right btn btn-floating btn-small waves-effect waves-light blue white-text">
            <i className="material-icons">{props.btnIcon}</i>
          </div>
          <div className="left white-text">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonCard;
