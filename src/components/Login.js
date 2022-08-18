import React from 'react';
import Cookies from 'js-cookie';
import { useSetAtom } from 'jotai';
import { loggedAtom } from '../atoms/user';
const API_URL = "http://localhost:1337/auth/local/"

function Login() {

    const logged = useSetAtom(loggedAtom)

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            identifier: e.target.identifier.value,
            password: e.target.password.value,
        };

        // console.log(typeof JSON.stringify(data));

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {

            if (data.statusCode) {
                alert("erreur de connexion");
                return;
            }

            console.log(data);
            Cookies.set('token', data.jwt)
            // console.log(Cookies.get('token'));
            logged(true);
        })
        .catch(error => {
            alert("erreur");
            console.log(error.message);
            
            logged(false);
            })
    }

   
    return (
        <div>
            <form onSubmit={handleSubmit}>
                Identifier : <input type="text" name="identifier"/>
                   
                <br/>
                
                Password : <input type="password" name="password"/><br/>

                <button type="submit" className='bg-black text-white text-sm font-bold rounded-3xl py-2 px-4 w-fit cursor-pointer'>submit</button>
            </form>

            
        </div>
    );
}

export default Login;