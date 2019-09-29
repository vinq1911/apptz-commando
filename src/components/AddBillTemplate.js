import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import CardPanel from './CardPanel';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';



const AddBillTemplate = () => {

  const context = useContext(StateContext);
  const onThisSubmit = (form) => {
    form.preventDefault();
    context.rootcb('addBillTemplate');
  }
  const onFieldChange = (e, fname) => {
    context.dispatch({addbillform: {...context.state.addbillform, [fname]: e.target.value}});
  }

  return (
    <CardPanel>
      <div className="input-field col s12"><h5>Add bill template</h5></div>
      <form onSubmit={onThisSubmit} className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input onChange={(e) => {onFieldChange(e, 'billidentifier')}} id="username" type="text" value={context.state.addbillform.billidentifier} className="validate" />
            <label htmlFor="username">Bill identifier</label>
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

export default AddBillTemplate;
