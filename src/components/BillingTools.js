import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import AddBillTemplate from './AddBillTemplate';
import Maso from './Maso';
import Bill from './Bill';



const BillTemplateList = () => {
  const context = useContext(StateContext);
  if (typeof context.state.billTemplateData !== "object") return (<div></div>);
  return Object.keys(context.state.billTemplateData).map(key => {
    if (context.state.billTemplateData[key].lb_is_template == 1) {
        return (<Bill key={key} billId={key} />);
    }
    return;
  });
}


const BillingTools = () => {
  const context = useContext(StateContext);
  const StateJson = function() {return JSON.stringify(context.state) }

  return (
    <Maso>
      <BillTemplateList />
      <AddBillTemplate />

    </Maso>
  );
}

export default BillingTools;
