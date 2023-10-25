import React, { useState } from 'react';
import UserProfileContext from '../Context';

const UserProfileProvider = (props) => {
    const [ profile, setProfile ] = useState(null);

    return (
        <UserProfileContext.Provider value={ [ profile, setProfile ] }>
            { props.children }
        </UserProfileContext.Provider>
    );
};

export default UserProfileProvider;