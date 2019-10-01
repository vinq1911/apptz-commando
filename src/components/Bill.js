import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import ButtonCard from './ButtonCard';
import Grid from '@material-ui/core/Grid';
import DayPicker from 'react-day-picker';
import CloseBtn from './CloseBtn';
import 'react-day-picker/lib/style.css';


const formatNum = (num) => {
  var _num = parseFloat(num);
  return _num.toFixed(2);
}

const BillAssignBtn = (props) => {

  const context = useContext(StateContext);
    console.log(Object.keys(context.state.selectedElements).length);
  const cssClasses = (Object.keys(context.state.selectedElements).length > 0) ? 'waves-effect waves-light blue white-text' : 'disabled';
  return (<a onClick={() => { context.rootcb('addBillRow', props.billId); }} className={`ml-1 btn ${cssClasses} right`}><i className="material-icons">add</i></a>);
}

const BillInputRow = (props) => {
  const context = useContext(StateContext);
  const billData = context.state.billingData[props.billId];
  const addBillData = context.state.addBillingData[props.billId] || {productRow: '', priceRow: '', taxRow: context.state.defaultTax, dueDateRow: (new Date('today'))};

  return (
    <div className="row">
      <div className="input-field col s12">
        <input onChange={(e) => { context.rootcb('changeTempBillingInfo', {id: props.billId, data: {...addBillData, productRow: e.target.value }}) }} type="text" value={addBillData.productRow} className="validate" />
        <label>Add bill row</label>
      </div>
      <div className="input-field col s8">
        <input onChange={(e) => { context.rootcb('changeTempBillingInfo', {id: props.billId, data: {...addBillData, priceRow: e.target.value }}) }} type="number" step="0.01" value={addBillData.priceRow} className="validate" />
        <label>Add row total</label>
      </div>
      <div className="input-field col s4">
        <input onChange={(e) => { context.rootcb('changeTempBillingInfo', {id: props.billId, data: {...addBillData, taxRow: e.target.value }}) }} type="number" step="0.01" value={addBillData.taxRow} className="validate" />
        <label>Add tax %</label>
      </div>
      <div className="col s12 pb-2 pt-2 pl-2">
        <BillAssignBtn />
        <a onClick={() => { context.rootcb('addBillRow', props.billId); }} className="ml-1 btn blue white-text waves-effect waves-light right"><i className="material-icons">add</i></a>
      </div>
      <div className="input-field col s12">
        <input onChange={(e) => { context.rootcb('changeTempBillingInfo', {id: props.billId, data: {...addBillData, dueDateRow: e.target.value }}) }} type="date" value={addBillData.dueDateRow} className="validate" />
        <label>Payment due date:</label>
      </div>
    </div>);
}

const Bill = (props) => {
  const context = useContext(StateContext);
  const billTemplateId = props.billId;
 console.log(context.state.billingData);
  const BillRows = () => {
    if (typeof context.state.billingData[billTemplateId] !== "object") return (<div></div>);
    return Object.keys(context.state.billingData[billTemplateId]).map(key => {
      return (
          <Grid key={key} container alignItems="center">

           <Grid item xs>
              <CloseBtn dp="removeBillRow" keyid={key} />
            {context.state.billingData[billTemplateId][key].lbl_text}
           </Grid>
           <Grid item>
            {formatNum(context.state.billingData[billTemplateId][key].lbl_amount / 100)}
           </Grid>
         </Grid>
      );
    });
  };
  const BillTax = () => {
    let subTotal = 0;
    let taxTotal = 0;
    let totalTotal = 0;
    if (typeof context.state.billingData[billTemplateId] !== "object") return (<div></div>);
    Object.keys(context.state.billingData[billTemplateId]).map(key => {
      var tax = (context.state.billingData[billTemplateId][key].lbl_tax / 10000) * context.state.billingData[billTemplateId][key].lbl_amount / 100;
      subTotal += context.state.billingData[billTemplateId][key].lbl_amount / 100 - tax;
      taxTotal += tax;
      totalTotal += context.state.billingData[billTemplateId][key].lbl_amount / 100;
    });
    return (
        <div className="mt-4 pb-1">
          <Grid className="ultra-small pl-1 pr-1" container alignItems="center">
           <Grid item xs>
            Subtotal:
           </Grid>
           <Grid item>
            {formatNum(subTotal)}
           </Grid>
         </Grid>
         <Grid className="ultra-small pl-1 pr-1" container alignItems="center">
          <Grid item xs>
           Tax:
          </Grid>
          <Grid item>
           {formatNum(taxTotal)}
          </Grid>
         </Grid>
         <Grid container alignItems="center">
           <Grid item xs>
            Total:
           </Grid>
           <Grid item>
            {formatNum(totalTotal)}
           </Grid>
         </Grid>
       </div>
     );
   };




  return(
      <div className="col s12 m6 l4 basicCard">
        <div className="card" key={billTemplateId}>
          <div className="card-content">
            <a onClick={ () => { context.rootcb('removeBillTemplate', billTemplateId);} } className="btn btn-floating waves-effect waves-light right red"><i className="material-icons">close</i></a>
            <div className="card-title">
              <h5>{context.state.billTemplateData[billTemplateId].lb_name} </h5>
            </div>
          </div>
          <div className="card-content">

            <BillRows />
            <p></p>
            <BillTax />
            <p></p>
            <BillInputRow billId={billTemplateId} />
          </div>
        </div>
      </div>
    );

}

export default Bill;
