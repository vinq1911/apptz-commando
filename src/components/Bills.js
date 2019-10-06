import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import Maso from './Maso';
import Bill from './Bill';



const BillList = () => {
  const context = useContext(StateContext);
  if (typeof context.state.billTemplateData !== "object") return (<div></div>);
  let searchTerm = context.state.searchTerm;
  const searchMatch = (needle, haystack) => {
    return Object.keys(haystack).some(function(key) {
      if (typeof haystack[key] === 'object') {
        return searchMatch(needle, haystack[key]);
      } else {
        return haystack[key].toString().toLowerCase().includes(needle.toLowerCase());
      }
    });
  };
  return Object.keys(context.state.billTemplateData).map(key => {
    if (context.state.billTemplateData[key].lb_is_template == 0) {
      if (context.state.searchTerm.length > 0) {
        if (searchMatch(context.state.searchTerm, context.state.billTemplateData[key]) || searchMatch(context.state.searchTerm, context.state.userData[context.state.billTemplateData[key].lb_sender]) || searchMatch(context.state.searchTerm, context.state.userData[context.state.billTemplateData[key].lb_receiver]) || context.state.searchTerm.toLowerCase() === "all" || searchMatch(context.state.searchTerm, context.state.billTemplateData[key].lb_send_time.toString())) {
          return (<Bill key={key} billId={key} />);
        }
      }
    }
    return;
  });
}


const Bills = () => {
  const context = useContext(StateContext);

  return (
    <Maso>
      <BillList />
    </Maso>
  );
}

export default Bills;
