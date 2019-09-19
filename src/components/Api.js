import React from 'react';
import axios from 'axios';
import UserCard from './UserCard';

class Api extends React.Component {
  state = { users: [] };



  componentDidMount() {
    axios.get('https://api.apptz.app/2/listusers')
      .then(res => {
        this.setState({ users: res.data });
    });
  }

  render() {
      return this.state.users.map((usr) => {return (

        <UserCard key={usr.cust_id} userData={usr} onModify={this.props.onModify} />

    )});
  }

}

export default Api;
