import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

class UserCard extends React.Component {

  userMod = () => {
    this.props.onModify(this.props.userData.cust_id);
  }

  render() {
    return (
      <Card>
        <Image src={`https://connect.apptz.app/assets/img/${this.props.userData.cust_picture}`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.userData.cust_name}</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            <span onClick={this.userMod}>Click</span>
          </Card.Description>
        </Card.Content>

      </Card>
    );
  }
}

export default UserCard;
