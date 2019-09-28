import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import M from 'materialize-css';

const InstantChangeInput = (props) => {
  const context = useContext(StateContext);
  console.log(props);

  const onThisChange = (val, params) => {
    var oldState = context.state;
    oldState[props.elemType][params.fieldId][params.fieldKey] = val;
    console.log(oldState);
    context.dispatch({ ...oldState });
  };

  console.log(props.elemData);
  const fields = props.elemData;
  let f2 = [];
  Object.keys(fields).forEach((udKey) => {;
    console.log(udKey);
    console.log(fields[udKey]);
    if (context.state.allowUserEditFields[udKey]) {
      f2.push(
        <div className="input-field col s12">
          <input onChange={(e) => { onThisChange(e.target.value, {fieldId: fields.id, fieldKey: udKey}) }} id={udKey+"-"+fields.id} type="text" value={fields[udKey]} className="validate" />
          <label htmlFor={udKey+"-"+fields.id}>{udKey}</label>
        </div>
      );
    }
    if (udKey === 'notes') {
      context.state.customUserFields.map((customfield) => {
        f2.push(
          <div className="input-field col s12">
            <input onChange={(e) => { onThisChange({[customfield.fieldId]: e.target.value}, {fieldId: fields.id, fieldKey: 'notes'}) }} id={customfield.fieldId+"-"+fields.id} type="text" value={context.state[props.elemType][fields.id]['notes'][customfield.fieldId]} className="validate" />
            <label htmlFor={customfield.fieldId+"-"+fields.id}>{customfield.fieldName}</label>
          </div>
        );
      });
    }
  });


  return f2.map((el) => { return el; });
}

export default InstantChangeInput;
