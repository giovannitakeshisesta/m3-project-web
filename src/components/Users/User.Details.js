import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../services/UsersService';

const UserDetails = () => {
    const {id} = useParams()

    const [user,setUser] = useState({}) // o null
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        getUserDetails(id)
        .then(response =>  {
            setLoading(false)
            setUser(response)
        } )
        .catch(err => console.log(err))
    }, [id]);

    return (
        <div>
            {!loading ? user.name : <p>...loading</p>}
        </div>
    );
}

export default UserDetails;
