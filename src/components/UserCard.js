import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import { Card, Icon, Image } from 'semantic-ui-react';
import InstantChangeInput from './InstantChangeInput';
import ImageFileInput from './ImageFileInput';
import DragAndDrop from './DragAndDrop';
import M from 'materialize-css';


const UserCard = (props) => {

  const userImg = React.createRef();

  const profileData = props.profileData || {};
  const extraFieldMap = function(extraField) {
    // console.log(extraField);
    if (profileData.notes) {
      return (
        <p><i className="material-icons profile-card-i">{extraField.fieldIcon}</i>{profileData['notes'][extraField.fieldId]}</p>
      );
    }
    return;
  }
  let fileList = [];

  const context = useContext(StateContext);

  return (
    <div className="col s12 m6 l4 basicCard">
        <div id="profile-card" className={(context.state.selectedElements[profileData.id]) ? "card teal lighten-4" : "card deep-purple lighten-5"}>
            <div ref={userImg} className="card-image waves-effect waves-block waves-light">
               <img src={profileData.userBg} alt="user bg" />
            </div>
            <div className="card-content">

                 <img src={profileData.userImg} alt="" className="circle responsive-img card-profile-image cyan lighten-1 padding-2" />

               <a className="btn-floating activator btn-move-up waves-effect waves-light blue accent-2 z-depth-4 right">
                  <i className="material-icons">edit</i>
               </a>
               <a onClick={ () => {
                 var selelem = context.state.selectedElements;
                 selelem[profileData.id] ^= true;
                 context.dispatch({selectedElements: selelem});
                 // console.log(context.state.selectedElements);
               }} className="btn-floating btn-move-up waves-effect waves-light blue accent-2 z-depth-4 right">
                  <i className="material-icons">shopping_basket</i>
               </a>
               <h5 className="card-title activator grey-text text-darken-4">{profileData.userName}</h5>
               <p><i className="material-icons profile-card-i">perm_identity</i> {profileData.userStatus}</p>
               <p><i className="material-icons profile-card-i">perm_phone_msg</i> {profileData.userPhone}</p>
               <p><i className="material-icons profile-card-i">email</i> {profileData.userEmail}</p>
               {context.state.customUserFields.map(extraFieldMap)}
            </div>
            <div className="card-reveal">
               <span className="card-title grey-text text-darken-4">{profileData.userName} <i className="material-icons right">close</i>
               </span>
               <p>Edit your information here.</p>
               <ImageFileInput imageName="profileImage" imageType="profileImage" imageTarget={profileData.id}>
                <span className="btn blue accent-2 z-depth-2">Upload profile image<input className="file-path" type="hidden" /></span>
               </ImageFileInput>

               <InstantChangeInput elemData={profileData} elemType="userData" />
               
               <p></p>
               <p><a className="btn red accent-2 z-depth-2 btn-move-down waves-effect waves-light" onClick={ () => { context.rootcb('saveUser', profileData) }}>
                Save changes
               </a></p>
               <p>
               <a className="btn red accent-2 z-depth-2 btn-move-down waves-effect waves-light" onClick={ () => { context.rootcb('removeUser', profileData.id) }}>
                Remove user
               </a>
               </p>
            </div>
         </div>
     </div>
  );
}

export default UserCard;
