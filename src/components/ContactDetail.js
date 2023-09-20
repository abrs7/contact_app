import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/prof.jpg';

const ContactDetail = (props) => {
  const { name, email } = props.location.state.contact;

  return (
    <div className='main'>
      <div className='ui card centered'>
        <div className='image'>
          <img src={user} alt='user' />
          <div className='header'>{name}</div>
          <div className='description'>{email}</div>
        </div>
      </div>
      <div className='center-div'>
        <Link to='/'> {/* Link to the contact list */}
          <button className='ui button green center'>Back to Contact List</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
