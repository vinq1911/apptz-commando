import React, { useContext } from 'react';
import StateContext from '../StateMachine';

const CardPanel = (props) => {
  return (
  <div className="col s12 m6 l4">
    <div className={`card-panel gradient-shadow ${props.cardClass}`}>
      <div className="row">
        <div className="col s12">
          {props.children}
        </div>
      </div>
    </div>
  </div>
  );
}

export default CardPanel;
