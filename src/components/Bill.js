import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import ButtonCard from './ButtonCard';
import Grid from '@material-ui/core/Grid';
import DayPicker from 'react-day-picker';
import CloseBtn from './CloseBtn';
import 'react-day-picker/lib/style.css';
import Moment from 'react-moment';
import moment from 'moment';

Moment.globalFormat = 'YYYY-MM-DD';
const formatNum = (num) => {
  var _num = parseFloat(num);
  return _num.toFixed(2);
}



const BillAssignBtn = (props) => {

  const context = useContext(StateContext);
  const cssClasses = (Object.keys(context.state.selectedElements).length > 0) ? 'waves-effect waves-light blue white-text' : 'disabled';
  const numSelUsers = Object.keys(context.state.selectedElements).length;
  const numSelUsersText = (numSelUsers) => {
    switch(true) {
      case (numSelUsers > 1):
       return "Assign "+numSelUsers+" users";
      case (numSelUsers == 1):
       return "Assign one user";
      case (numSelUsers == 0):
       return "Select users";
    }
    return "Mistake.";
  };

  return (<a onClick={() => { context.rootcb('assignBill', props.billId); }} className={`ml-1 btn ${cssClasses}`}>{numSelUsersText(numSelUsers)}</a>);
}


  const PaymentDueDateDisplay = (props) => {
    const context = useContext(StateContext);
    const billData = context.state.billingData[props.billId];
    const addBillData = context.state.addBillingData[props.billId] || {productRow: '', priceRow: '', taxRow: context.state.defaultTax, dueDateRow: (new Date())};
    if (context.state.billTemplateData[props.billId].lb_is_template == 1) {
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
          <div className="col s12 pb-2 pt-2 pl-2 right-align">

            <a onClick={() => { context.rootcb('addBillRow', props.billId); }} className="ml-1 btn blue white-text waves-effect waves-light">Add row</a>
          </div>
          <div className="input-field col s12">
            <input onChange={(e) => { context.rootcb('changeTempBillingInfo', {id: props.billId, data: {...addBillData, dueDateRow: e.target.value }}) }} type="date" value={addBillData.dueDateRow} className="validate" />
            <label>Payment due date:</label>
          </div>
          <div className="col s12 pb-2 pt-2 pl-2 right-align">
            <BillAssignBtn billId={props.billId} />
          </div>
        </div>);
    } else {
      const DueDate = () => { return moment(context.state.billTemplateData[props.billId].lb_due_time*1000).format("DD-MM-YYYY"); };
      const SentTo = () => {
        const recv = context.state.billTemplateData[props.billId].lb_receiver;
        const sndr = context.state.billTemplateData[props.billId].lb_sender;
        const nameOrNot = (uid) => { return (typeof context.state.userData[uid] === "undefined") ? "Userdata not loaded" : context.state.userData[uid].userName };
        return (
          <div className="row">
            <div className="input-field col s12">
              <input disabled type="text" value={nameOrNot(sndr)} />
              <label>Created by:</label>
            </div>
            <div className="input-field col s12">
              <input disabled type="text" value={nameOrNot(recv)} />
              <label>Associated to:</label>
            </div>
          </div>
        )
      };
      return (<div>
        <div className="row mt-4">
          <div className="input-field col s12">
            <input disabled type="text" value={DueDate()}/>
            <label>Due date:</label>
          </div>
        </div>
      <SentTo />
    </div>);
    }
  };

const Bill = (props) => {
  const context = useContext(StateContext);
  const billTemplateId = props.billId;
 console.log(context.state.billingData);
  const BillRows = () => {
    const closeBtn = (bkey) => {
      if (context.state.billTemplateData[billTemplateId].lb_is_template == 1) {
        return (<CloseBtn dp="removeBillRow" keyid={bkey} />);
      }
      return (<span></span>);
    }
    if (typeof context.state.billingData[billTemplateId] === "undefined") return (<div></div>);
    return Object.keys(context.state.billingData[billTemplateId]).map(key => {
      return (
          <Grid key={key} container alignItems="center">

           <Grid item xs>
              {closeBtn(key)}
            {context.state.billingData[billTemplateId][key].lbl_text}
           </Grid>
           <Grid item>
            {formatNum(context.state.billingData[billTemplateId][key].lbl_amount / 100)}
           </Grid>
         </Grid>
      );
    });
  };

  const BillHandlers = (props) => {
    const context = useContext(StateContext);
    const billTemplateId = props.billId;
    if (context.state.billTemplateData[billTemplateId].lb_is_template == 0) {
      const [classespaid, btnpaidtext] = (context.state.billTemplateData[billTemplateId].lb_is_paid) ? ["btn blue white-text waves-effect waves-light", "Mark paid"] : ["btn disabled", "Already paid"];
      const PaidButton = () => {
        return (<a onClick={() => { context.rootcb('markPaid', props.billId); }} className={classespaid}>{btnpaidtext}</a>);
      };
      const [classessent, btnsenttext] = (context.state.billTemplateData[billTemplateId].lb_is_sent) ? ["btn blue white-text waves-effect waves-light", "Send"] : ["btn red white-text waves-effect waves-light", "Send again"];
      const SentButton = () => {
        return (<a onClick={() => { context.rootcb('sendBill', props.billId); }} className={classessent}>{btnsenttext}</a>);
      };
      const PdfButton = () => {
        return (<a onClick={() => { context.rootcb('getPdfBill', props.billId); }} className="btn green white-text waves-effect waves-light">Print PDF</a>);
      };

      return (
        <div className="row right-align">
          <div className="col s12 mt-2">
            <PaidButton />
          </div>
          <div className="col s12 mt-2">
            <SentButton />
          </div>
          <div className="col s12 mt-2">
            <PdfButton />
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }

  const BillTax = () => {
    let subTotal = 0;
    let taxTotal = 0;
    let totalTotal = 0;
    if (typeof context.state.billingData[billTemplateId] === "undefined") return (<div></div>);
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
            <PaymentDueDateDisplay billId={billTemplateId} />
            <p></p>
            <BillHandlers billId={billTemplateId} />
          </div>
        </div>
      </div>
    );

}

export default Bill;
