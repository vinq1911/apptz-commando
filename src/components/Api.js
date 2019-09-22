import React from 'react';
import axios from 'axios';
import ApptzConfig from '../Apptzconfig';

class Api extends React.Component {
  state = {
    apptzConfig: {},
    initialized: false,
    privileged: false
  };
  constructor(props) {
    super(props);
    axios.get(`${ApptzConfig.endpoint}/${ApptzConfig.base}/apptzConfig`)
      .then(res => {
        console.log(res);
        this.setState({ apptzConfig: res.data });
    });
  }
}

export default Api;
