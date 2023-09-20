import React from 'react'
import {Link} from 'react-router-dom';
import user from '../images/user.png'
const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    
  return (
    <div className='item'>
      <img src={user} className='user avatar image' style={{height:"30px", width: "40px"}} alt="user"/>
                <div className='content'>
                <Link to={{pathname:`/contact/${id}`, state:{contact: props.contact}}}>
                    <div className='header'>
                       
                      {name}
                    
                      </div>


                    <div>
                      
                      {email}
                      
                      </div>
                      </Link>
                </div>
                
               
                <i className='trash alternate outline icon' style={{color: "red" ,marginLeft: "10px", marginTop: "7px", float: "right"}}
               onClick={()=>props.clickHandler(id)}

               ></i>
               <Link to={{pathname:'/edit', state:{contact: props.contact}}}> 
               <i className='edit alternate outline icon' style={{color: "green",  marginTop: "7px", float: "right"}}
               
               ></i>
               </Link>
            </div>
  )
}

export default ContactCard