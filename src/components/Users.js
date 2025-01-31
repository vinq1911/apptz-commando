import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import StateContext from '../StateMachine';
import axios from 'axios';
import UserCard from './UserCard';
import ApptzConfig from '../Apptzconfig';
import ButtonCard from './ButtonCard';
import AddUserCard from './AddUserCard';
import Maso from './Maso';


function Users(props) {

  const context = useContext(StateContext);
  let searchTerm = context.state.searchTerm;
  let userData = context.state.userData;
  let retval1, retval2;
  let userdataPresentMessage = "User data not loaded.";
  const searchMatch = (needle, haystack) => {
    return Object.keys(haystack).some(function(key) {
      if (typeof haystack[key] === 'object') {
        return searchMatch(needle, haystack[key]);
      } else {
        return haystack[key].toString().toLowerCase().includes(needle.toLowerCase());
      }
    });
  };
  if (typeof userData !== 'undefined') {
    userdataPresentMessage = "No user data. Add users, maybe?";
    if (userData.length > 0) {
      if (context.state.searchTerm.length > 0) {
        retval1 = userData.map((userData) => {
          if (searchMatch(context.state.searchTerm, userData)) {
            return (
              <UserCard key={userData.id} profileData={userData} />
            );
          }
          return;
        });
      } else {
        return (<div className="col s12 center-align"><h3>
          <span>{Object.keys(userData).length}</span> <span>users loaded.</span>
        </h3>
        <p>Use search bar to show results.</p>
        </div>)
      }

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

export default Users;
