import React from "react"
import { useIdentityContext } from 'react-netlify-identity';
import Login from './Login';
import Table from './Table';

function FAQTable(){
  const { signupUser, isLoggedIn, user, loginUser } = useIdentityContext();
  //console.log(identity)
  const register = (email, password) => {
    signupUser(email, password)
      .then(user => {
        console.log('Success! Signed up', user);
      })
      .catch(err => console.error(err));
  }
  let content;
  if(isLoggedIn){
    content = <Table user={user}/>
  } else {
    content = <Login register={register} user={user} loginUser={loginUser}/>
  }
  
  return (
    <div>
      {content}
    </div>
    )
}

export default FAQTable;