import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import axios from 'axios';
import UserCard from './UserCard';
import ApptzConfig from '../Apptzconfig';
import ButtonCard from './ButtonCard';
import AddUserCard from './AddUserCard';

function Groups(props) {
  const context = useContext(StateContext);
  let searchTerm = context.state.searchTerm;
  let groupData = context.state.groupData;

  let retval, displayaddgroup;
  console.log(groupData);
  if (typeof userData !== 'undefined') {
    if (userData.length > 0) {
      retval = props.map((groupData) => {
        return (
          <GroupCard groupData={groupData} />
        );
      });
    } else {
      retval = (
        <div>
        <ButtonCard btnIcon="replay" btnCb={() => { context.rootcb('refreshData'); }}>No group data present.<br />Press reload to check in groupdata.</ButtonCard>
        <ButtonCard btnIcon="person_add" btnCb={() => { context.rootcb('switchAddGroup'); }}>Add new group<br />Toggle group creator on / off </ButtonCard>
        </div>
      );
    }
  }

  if (context.state.addUserCard) {
    displayadduser = <AddUserCard />;
  }

  return (
    <div>
      {displayadduser}
      {retval}
    </div>
  );

}

export default Groups;
