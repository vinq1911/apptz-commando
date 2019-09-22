import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

function UserCard(props) {

  const profileData = props.profileData;

  return (
    <div className="col s12 m6 l4">
      <div id="profile-card" className="card">
          <div className="card-image waves-effect waves-block waves-light">
             <img className="activator" src={profileData.userBg} alt="user bg" />
          </div>
          <div className="card-content">
             <img src={profileData.userImg} alt="" className="circle responsive-img activator card-profile-image cyan lighten-1 padding-2" />
             <a className="btn-floating activator btn-move-up waves-effect waves-light red accent-2 z-depth-4 right">
                <i className="material-icons">edit</i>
             </a>
             <h5 className="card-title activator grey-text text-darken-4">{profileData.userName}</h5>
             <p><i className="material-icons profile-card-i">perm_identity</i> {profileData.userStatus}</p>
             <p><i className="material-icons profile-card-i">perm_phone_msg</i> {profileData.userPhone}</p>
             <p><i className="material-icons profile-card-i">email</i> {profileData.userEmail}</p>
          </div>
          <div className="card-reveal">
             <span className="card-title grey-text text-darken-4">{profileData.userName} <i className="material-icons right">close</i>
             </span>
             <p>Edit your information here.</p>
             <p  onClick={() => {console.log("boo"); props.dispatch({type: 'selectProfile', selectedProfile: profileData.userName})}} ><i className="material-icons">perm_identity</i> {profileData.userStatus}</p>
             <p><i className="material-icons">perm_phone_msg</i> {profileData.userPhone}</p>
             <p><i className="material-icons">email</i> {profileData.userEmail}</p>
             <p><i className="material-icons">cake</i> {profileData.userBday}</p>
             <p></p>
          </div>
       </div>
     </div>
  );
}

export default UserCard;
