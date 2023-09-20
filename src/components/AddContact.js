import React from 'react';


class AddContact extends React.Component{
     state = {
        name :"",
        email: ""
     }
     add = (e)=>{
        e.preventDefault();
        if(this.state.name === "" || this.state.email === ""){
            alert("Please Enter a Valid Name and Email! ");
            return
        }
        this.props.addContactHandler(this.state);
        this.setState({name: "", email:""});
        this.props.history.push("/");

     }


   render(){
    return(
    <div className='ui main'>
        <h2 style={{ marginBottom: '20px' }}>Add Contact</h2>
        <form className='ui form' onSubmit={this.add}>
   <div className='field'>
    <label>Name</label>
    <input type="text" name="name" pkaceholder="Name"
    value={this.state.name}
    onChange={(e) => this.setState({name : e.target.value })}/>
   </div>
   <div className='field'>
    <label>Email</label>
    <input type="email" name="email"
    value={this.state.email}
    onChange={(e) => this.setState({email : e.target.value })}
    placeholder="Email"/>
   </div>
   <button className='ui button blue'>Add</button>

        </form>
    </div>
    )
   }

}



export default AddContact;
