import React from 'react';
import Cookies from 'js-cookie';
import { loggedAtom } from '../atoms/user';
import { useSetAtom } from 'jotai';
import { currentUserAtom } from '../atoms/currentUser';
const API_URL = "http://localhost:1337/auth/local/register"

function Signup() {

    const userID = useSetAtom(currentUserAtom);
    const logged = useSetAtom(loggedAtom);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        console.log(typeof JSON.stringify(data));

        fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            Cookies.set('token', data.jwt)
            console.log(Cookies.get('token'));
            logged(true);
            userID(JSON.stringify(data.user));
        })
        .catch(error => {
            console.log(error.message);
            logged(false);
            })
    }

    
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                Username : 
                    <label htmlFor="username">
                        <input type="text" name="username"/>
                    </label>
                    <br/>
                EMail : <input type="text" name="email"/><br/>
                Password : <input type="password" name="password"/><br/>
                <button type="submit" className='bg-black text-white text-sm font-bold rounded-3xl py-2 px-4 w-fit cursor-pointer'>submit</button>
            </form>

            
        </div>
    );
}

export default Signup;