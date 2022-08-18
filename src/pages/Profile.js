import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import EditProfile from "./EditProfile";

const API_URL = "http://localhost:1337/users/me";

function Profile() {

	const [ userData, setUserData ] = useState(null);

	const token = Cookies.get('token');

	useEffect( () => {

		fetch(API_URL, {
			method: "GET",
			headers: { 'Authorization': `Bearer ${token}`}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			setUserData(data);
		})
		.catch(error => console.log(error.message))

	}, [])

	return (
		<div>
			{" "}
			<h1 className='text-3xl font-bold underline'>Hello Profile !</h1>

			{
				userData && <>
								<p>username : {userData.username}</p>
								<p>email : {userData.email}</p>
								<EditProfile userID={userData.id}/>
							</>
							
			}

			
		</div>
	);
}

export default Profile;
