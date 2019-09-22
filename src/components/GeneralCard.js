import React from 'react';

const GeneralCard = (props) => {
  var cName = "col s12";
  var childBox = '';
  var icon = '';
  if (props.children) {
    cName = "col s5";
    if (props.icon) {
      icon = (<i className="material-icons background-round mt-5 mb-5 gradient-45deg-purple-amber gradient-shadow white-text">{props.icon}</i>);
    }
    childBox = (<div className="col s7 m7 right-align">
      {icon}
       <p className="mb-0">{props.children}</p>
    </div>);
  }
  return (
    <div className="col s12 m6 l4">
      <div className="card padding-4 animate fadeLeft">
        <div className={cName}>
          <h5 className="mb-0">{props.maintitle}</h5>
          <p className="no-margin">{props.subtitle}</p>
          <p className="mb-0 pt-8">{props.information}</p>
        </div>
        {childBox}
      </div>
    </div>
  );
};

export default GeneralCard;
