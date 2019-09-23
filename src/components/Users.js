import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import axios from 'axios';
import UserCard from './UserCard';
import ApptzConfig from '../Apptzconfig';
import ButtonCard from './ButtonCard';
import AddUserCard from './AddUserCard';


function Users(props) {

  const context = useContext(StateContext);
  let searchTerm = context.state.searchTerm;
  let userData = context.state.userData;
  let retval1, retval2, displayadduser;
  let userdataPresentMessage = "User data not loaded.";
  console.log(userData);
  if (typeof userData !== 'undefined') {
    userdataPresentMessage = "No user data. Add users, maybe?";
    if (userData.length > 0) {
      userdataPresentMessage = "Reload userdata";
      retval1 = userData.map((userData) => {
        return (
          <div key={userData.id}>
            <UserCard profileData={userData} />
          </div>
        );
      });
    }
  }
  retval2 = (
    <div>
      <AddUserCard />
      <ButtonCard btnClass="indigo lighten-5" btnIcon="replay" btnCb={() => { context.rootcb('refreshData'); }}>{userdataPresentMessage}<br />Press reload to check in userdata.</ButtonCard>
      <ButtonCard btnClass="light-blue lighten-5" btnIcon="person_add" btnCb={() => { context.rootcb('switchAddUser'); }}>Add new user<br />Toggle user creator on / off </ButtonCard>
    </div>
  );

  

  return (
    <div>
      {displayadduser}
      {retval1}
      {retval2}
    </div>
  );

}

export default Users;
