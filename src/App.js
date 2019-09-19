import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Api from './components/Api';
import Menu from './components/Menu';

class App extends React.Component {

  state = { name: 'Joe' };

  changeUserData = (uid) => {
     console.log(`modifying ${uid}`);
  }

  render() {
    return (
      <div className="App">
        <div className="ui sidebar inverted vertical menu">
          <Menu />
        </div>
        <div className="pusher">
          <div className="ui link cards">
            <Menu />
            <Api onModify={this.changeUserData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
