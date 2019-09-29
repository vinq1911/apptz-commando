import React, { useContext } from 'react';
import StateContext from '../StateMachine';
import UserCard from './UserCard';


const ProfileCard = () => {

    const context = useContext(StateContext);
    const profileData = context.state.profileData;
    return (
      <UserCard profileData={profileData} dispatch={context.dispatch} />
    );
}

export default ProfileCard;
