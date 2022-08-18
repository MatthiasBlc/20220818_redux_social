import React from 'react';
import Cookies from 'js-cookie';
import { useSetAtom } from 'jotai';
import { loggedAtom } from '../atoms/user';
// const API_URL = "http://localhost:1337/auth/local/"


function EditProfile({userID}) {

    const token = Cookies.get('token');
    const logged = useSetAtom(loggedAtom)

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: e.target.username.value,
            email: e.target.email.value,
        };

        // console.log(typeof JSON.stringify(data));

        fetch(`http://localhost:1337/users/${userID}` , {
            method: "PUT",
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error.message);
            })
    }

   
    return (
        <div className='mt-10'>
            
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
                Username : <input type="text" name="username"/>
                   
                <br/>
                
                Email : <input type="text" name="email"/><br/>

                <button type="submit" className='bg-black text-white text-sm font-bold rounded-3xl py-2 px-4 w-fit cursor-pointer'>submit</button>
            </form>

            
        </div>
    );
}

export default EditProfile;