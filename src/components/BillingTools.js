import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import ButtonCard from './ButtonCard';
import AddBillTemplate from './AddBillTemplate';
import CardPanel from './CardPanel';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Maso from './Maso';
import Bill from './Bill';



const BillTemplateList = () => {
  const context = useContext(StateContext);
  if (typeof context.state.billTemplateData !== "object") return (<div></div>);
  return Object.keys(context.state.billTemplateData).map(key => {
    return (<Bill key={key} billId={key} />);
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
