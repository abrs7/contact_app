import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import api from '../api/contacts';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';

// import axios, { all } from 'axios';

const { v4: uuidv4 } = require('uuid');

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // const [loading, setLoading] = useState(true); // Track loading state
    
 
//   const Simn =  () => {useEffect(() => {
//     // Define the URL of your server's endpoint
//     const serverEndpoint = api ; // Replace with your actual server's endpoint

//     // Make a GET request to the server's health check endpoint
//      axios
//       .get(serverEndpoint)
//       .then((response) => {
//         // If the request is successful, log a message
//         console.log('Server is up and running:', response.data);
//       })
//       .catch((error) => {
//         // If there is an error, log an error message
//         console.error('Error checking server:', error);
//       });
//  }, []);

//   };
  
  // Retrieve Contacts from Api
  const retrieveContacts = async () => {
    try {
      const response = await api.get('');
      console.log("ApI Response:", response);
      return response.data;

    }
    
    catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('API Error Response Data:', error.response.data);
        console.error('API Error Status Code:', error.response.status);
      }
      return [];
    }
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact

    }
    const response = await api.post("", request)
    setContacts([...contacts , response.data]);
  };

  const updateContactHandler = async (contact) =>{
 
   const response = await api.put(`/${contact.id}`, contact);
   const {id, name, email} = [...contacts];
   setContacts(contacts.map(contacts=>{
      return contact.id === id ? {...response.data} : contact;
   }));


  }






  const removeContactHandler =async (id) => {
    
       await api.delete(`/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };


   const searchHandler = (searchTerm) =>{
      setSearchTerm(searchTerm);
      if(searchTerm !== ""){
        const newContactList = contacts.filter((contact) =>{
          
          return Object.calues(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase)
        });
        setSearchResult(newContactList);


      }
      else {
        setSearchResult(contacts);
      }
   }



  useEffect(() => {
    const getAllContacts = async () =>{
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }
    getAllContacts();
  }, []);



  useEffect(()=>{

  },[contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                 // Pass loading state to ContactList
                 term = {searchTerm}
                 searchKeyword = {searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact
                {...props}
                addContactHandler={addContactHandler}
              />
            )}
          />
           <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
          <Route path="/contact/:id" render={(props) => (
            <ContactDetail
              {...props}
              contacts={contacts}
            />
          )} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
