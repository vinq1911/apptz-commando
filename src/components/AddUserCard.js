import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import CardPanel from './CardPanel';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js'



const AddUserCard = () => {

  const context = useContext(StateContext);
  const onThisSubmit = (form) => {
    form.preventDefault();
    context.rootcb('addUser');
  }
  const onFieldChange = (e, fname) => {
    console.log(e.target.value);
    context.dispatch({adduserform: {...context.state.adduserform, [fname]: e.target.value}});
  }

  var ret = (context.state.addUserCard) ? (
    <CardPanel>
      <form onSubmit={onThisSubmit} className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input onChange={(e) => {onFieldChange(e, 'username')}} id="username" type="text" value={context.state.adduserform.username} className="validate" />
            <label htmlFor="username">First Name</label>
          </div>
          <div className="input-field col s12">
            <input onChange={(e) => {onFieldChange(e, 'useremail')}} if="userphone" type="email" value={context.state.adduserform.useremail} className="validate" />
            <label htmlFor="useremail">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input onChange={(e) => {onFieldChange(e, 'userphone')}} id="userphone" type="tel" value={context.state.adduserform.userphone} className="validate" />
            <label htmlFor="userphone">Phone</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input onChange={(e) => {onFieldChange(e, 'userpassword')}} id="userpassword" type="password" value={context.state.adduserform.userpassword} className="validate" />
            <label htmlFor="userpassword">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button className="btn waves-effect waves-light" type="submit">Save</button>
          </div>
        </div>
      </form>
    </CardPanel>
  ) : '';
  return ret;
}

export default AddUserCard;
