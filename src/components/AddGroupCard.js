import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import CardPanel from './CardPanel';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';



const AddGroupCard = () => {

  const context = useContext(StateContext);
  const onThisSubmit = (form) => {
    form.preventDefault();
    context.rootcb('addGroup');
  }
  const onFieldChange = (e, fname) => {
    console.log(e.target.value);
    context.dispatch({addgroupform: {...context.state.addgroupform, [fname]: e.target.value}});
  }
  const enterednumber = (context.state.addgroupform.groupphone.length > 0 && context.state.addgroupform.groupphone.substring(0,1) != "+") ? "+"+context.state.addgroupform.groupphone : context.state.addgroupform.groupphone;
  const phonenumber = parsePhoneNumberFromString(enterednumber);
  var displayNumber = enterednumber;
  if (phonenumber) {
    displayNumber = phonenumber.formatInternational();
  }
  return (
    <CardPanel>
      <div className="input-field col s12"><h5>Add new group</h5></div>
      <form onSubmit={onThisSubmit} className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input onChange={(e) => {onFieldChange(e, 'groupname')}} id="groupname" type="text" value={context.state.addgroupform.groupname} className="validate" />
            <label htmlFor="groupname">Group name</label>
          </div>
          <div className="input-field col s12">
            <input onChange={(e) => {onFieldChange(e, 'groupemail')}} id="groupemail" type="email" value={context.state.addgroupform.groupemail} className="validate" />
            <label htmlFor="groupemail">Contact email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input onChange={(e) => {onFieldChange(e, 'groupphone')}} id="groupphone" type="tel" value={displayNumber} className="validate" />
            <label htmlFor="groupphone">Contact phone</label>
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <button className="btn waves-effect waves-light mt-4 mb-4" type="submit">Save</button>
          </div>
        </div>
      </form>
    </CardPanel>
  );
}

export default AddGroupCard;
