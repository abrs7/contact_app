import React,{useRef} from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';


const ContactList = (props) => {
     const inputEl = useRef("")
    const deleteContactHandler  =  (id)=>{
      props.getContactId(id);
    }

    

    const renderContactList = props.contacts.map((con)=>{
        return(
           <ContactCard contact={con} clickHandler={deleteContactHandler} key={con.id}/>
            
        );
    });

    const getSearchTerm = () =>{
    props.searchKeyword(inputEl.current.value);
    }

  return (
    <div className='main '>
        <h3  className="ui blue " 
        style={{ marginBottom: '20px' }}>Contact List
          <Link to="/add">
          <button className='ui button blue right'>
        Add Contact</button>
          </Link>
      

        </h3>
         
     <div className='ui search'>
     <div className='ui icon input'>
      <input 
      ref={inputEl}
      type='text'
       placeholder='Search Contact'
        className='prompt'value={props.term}
         onChange={getSearchTerm} />
     <i className='search icon'></i>
     </div>

     </div>

    <div className='ui celled list'>
    
    {renderContactList.length > 0 ? renderContactList : "No Contact Available" }
    
    </div>
    </div>
  )
}

export default ContactList