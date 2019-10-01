import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import StateContext from '../StateMachine';
import axios from 'axios';
import GroupCard from './GroupCard';
import ApptzConfig from '../Apptzconfig';
import ButtonCard from './ButtonCard';
import Maso from './Maso';


function Groups(props) {

  const context = useContext(StateContext);
  let searchTerm = context.state.searchTerm;
  let groupData = context.state.groupData;
  let retval1, retval2;
  let groupdataPresentMessage = "Group data not loaded.";
  const searchMatch = (needle, haystack) => {

    return Object.keys(haystack).some(function(key) {
      if (typeof haystack[key] === 'object' || typeof haystack[key] === 'array') {
        return searchMatch(needle, haystack[key]);
      } else {
        return haystack[key].toString().toLowerCase().includes(needle.toLowerCase());
      }
    });
  };
  // console.log(groupData);
  if (typeof groupData !== 'undefined') {
    groupdataPresentMessage = "No user data. Add users, maybe?";
    if (groupData.length > 0) {
      groupdataPresentMessage = "Reload userdata";
      retval1 = groupData.map((groupData) => {
        if (context.state.searchTerm.length > 0 && searchMatch(context.state.searchTerm, groupData) || context.state.searchTerm.length == 0) {
          return (
            <GroupCard key={groupData.id} profileData={groupData} />
          );
        }
        return;
      });
    }
  }
  retval2 = (
    <div>

      
    </div>
  );





  return (
    <div>

      <Maso>
        {retval1}
      </Maso>


      {retval2}
    </div>
  );

}

export default Groups;
