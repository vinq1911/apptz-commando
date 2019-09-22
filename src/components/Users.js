import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import axios from 'axios';
import UserCard from './UserCard';
import ApptzConfig from '../Apptzconfig';
import ButtonCard from './ButtonCard';

function Users(props) {

  const context = useContext(StateContext);
  let searchTerm = context.state.searchTerm;
  let userData = context.state.userData;
  let retval;
  if (userData.length > 0) {
    retval = props.map((userData) => {
      return (
        <UserCard profileData={userData} />
      );
    });
  } else {
    retval = <ButtonCard btnIcon="replay" btnCb={() => { context.rootcb('reloadUserData'); }}>No userdata present.<br />Press reload to check in userdata.</ButtonCard>;
  }
  return retval;

}

export default Users;
