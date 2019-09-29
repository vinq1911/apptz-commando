import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import ButtonCard from './ButtonCard';
import AddBillTemplate from './AddBillTemplate';
import Maso from './Maso';

const BillTemplateList = () => {
  return (<div>List</div>);
}


const BillingTools = () => {
  const context = useContext(StateContext);
  const StateJson = function() {return JSON.stringify(context.state) }

  return (
    <Maso>
      <AddBillTemplate />
      <BillTemplateList />
    </Maso>
  );
}

export default BillingTools;
