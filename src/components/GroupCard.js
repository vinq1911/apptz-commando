import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import InstantChangeInput from './InstantChangeInput';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import M from 'materialize-css';


const GroupCard = (props) => {


  const profileData = props.profileData || {};
  const extraFieldMap = function(extraField) {
    if (profileData.notes) {
      return (
        <p><i className="material-icons profile-card-i">{extraField.fieldIcon}</i>{profileData['notes'][extraField.fieldId]}</p>
      );
    }
    return;
  }
  const classes = (makeStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing(1),
    },
  })))();





  const context = useContext(StateContext);
  const handleDelete = function(e) {
    context.rootcb('removeFromGroup', { groupId: profileData.id, userId: e });
  };
  const groupUsers = Object.keys(profileData.groupUsers).map((ukey) => {
    if (typeof context.state.userData[ukey] !==  'undefined') {
      return (<Chip
            avatar={<Avatar alt={context.state.userData[ukey].userName} src={context.state.userData[ukey].userImg} />}
            label={context.state.userData[ukey].userName}
            onDelete={function() { handleDelete(ukey); }}
            className={classes.chip}
        />);
    }
  });
  const groupGroups = Object.keys(profileData.groupGroups).map((ukey) => {

    return (<Chip
          avatar={<Avatar alt={context.state.groupData[ukey].name} src={context.state.groupData[ukey].image} />}
          label={context.state.groupData[ukey].name}
          onDelete={handleDelete}
          className={classes.chip}
      />);
  });

  const selectionsHasBeenMade = Object.keys(context.state.selectedElements).some((elem) => { return !!context.state.selectedElements[elem] });

  return (
    <div className="col s12 m6 l4 basicCard">

      <div id="profile-card" className={(context.state.selectedElements[profileData.id]) ? "card teal lighten-4" : "card deep-purple lighten-5"}>
          <div className="card-image waves-effect waves-block waves-light">
             <img src={profileData.image} alt="user bg" />
          </div>
          <div className="card-content">

             <a className="btn-floating activator btn-move-up waves-effect waves-light blue accent-2 z-depth-4 right">
                <i className="material-icons">edit</i>
             </a>

             <a onClick={ () => {
               if (selectionsHasBeenMade) {
                 var selelem = context.state.selectedElements;

                 context.rootcb('addToGroup', profileData.id);
               } else {

               }
             }} className={`btn-floating btn-move-up waves-effect waves-light accent-2 z-depth-4 right ${(selectionsHasBeenMade) ? 'blue accent-2' : 'disabled'}`}>
                <i className="material-icons">playlist_add</i>
             </a>
             <h5 className="card-title activator grey-text text-darken-4">{profileData.name}</h5>
             <p>{groupUsers}</p>
          </div>
          <div className="card-reveal">
             <span className="card-title grey-text text-darken-4">{profileData.name} <i className="material-icons right">close</i>
             </span>
             <p>Edit your information here.</p>
             <a className="btn red accent-2 z-depth-2 btn-move-down waves-effect waves-light" onClick={ () => { context.rootcb('removeGroup', profileData.id) }}>
              Remove group
             </a>
             <p></p>
          </div>
       </div>
     </div>
  );
}

export default GroupCard;
