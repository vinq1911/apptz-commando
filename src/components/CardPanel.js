import React, { useContext } from 'react';
import StateContext from '../StateMachine';

const CardPanel = (props) => {
  return (
  <div className="col s12 m6 l4 basicCard">
    <div className={`card gradient-shadow ${props.cardClass}`}>
      <div className="row">
        <div className="col s12 card-content center-align">
          {props.children}
        </div>
      </div>
    </div>
  </div>
  );
}

export default CardPanel;
