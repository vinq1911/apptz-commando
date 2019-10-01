import React, { useContext } from 'react';
import StateContext from '../StateMachine';


const CloseBtn = (props) => {
  const context = useContext(StateContext);
  return (<a onClick={ () => {context.rootcb(props.dp, props.keyid);} } className="red-text left ultra-small"><i className="material-icons">close</i></a>);
}

export default CloseBtn;
