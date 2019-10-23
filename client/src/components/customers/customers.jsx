import React from 'react';
import './customer-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Form, Table} from 'react-bootstrap';
export default class Customers extends React.Component{
 constructor(props){
   super(props);
   this.state = {
    customers:[],
    user_id:'',
    name:'',
    phone:'',
    email:'',
    password:'',
    sub_btn:'Save'
  } 
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.editRow = this.editRow.bind(this);
  this.deleteRow = this.deleteRow.bind(this);

}


handleChange(event){
  this.setState({ [event.target.name]: event.target.value });
    // this.setState({value: event.target.value});
  }


// Form Submit and Update 
handleSubmit(e){
 e.preventDefault();
 const databody={
  user_id:this.state.user_id,
  name:this.state.name,
  phone:this.state.phone,
  email:this.state.email,
  password:this.state.password
}


if(this.state.sub_btn=='Save'){
  fetch('/api/stored', {
    method: 'POST',
    body: JSON.stringify(databody),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(status => console.log(status));
  this.setState({
    name: '',
    phone:'',
    email:'',
    password:'',
  });
  this.getData();
}

if(this.state.sub_btn=='Update'){
  fetch('/api/update', {
    method: 'POST',
    body: JSON.stringify(databody),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(status => console.log(status));
  this.setState({
    name: '',
    phone:'',
    email:'',
    password:'',
    sub_btn:'Save'
  });
  this.getData();
}

}

// Row Edit 
editRow(e){
  e.preventDefault(); 
  var u_id = e.target.attributes.getNamedItem('data-id').value;
  const postData = {
    user_id:u_id
  }

  fetch('/api/edit',{
   method: 'POST',
   body: JSON.stringify(postData),
   headers: {
    'Content-Type': 'application/json'
  },
})
  .then(res => res.json())

  .then(oneRow =>  
    oneRow.forEach((v) => {
        // console.log('this == inside', this);
        this.setState({
          user_id : v.user_id,
          name : v.name,
          phone : v.phone,
          email : v.email,
          password : v.password,
          sub_btn:'Update'
        });
      })
    );

}


// Row Delete
deleteRow(e){
  e.preventDefault(); 
  var u_id = e.target.attributes.getNamedItem('delete-id').value;
  const postData = {
    user_id:u_id
  }

  fetch('/api/delete',{
   method: 'POST',
   body: JSON.stringify(postData),
   headers: {
    'Content-Type': 'application/json'
  },
})
  .then(res => res.json())
  .then(deletedRow =>  console.log(deletedRow));
  this.getData();
  
}

componentDidMount() {
  this.getData();
        // this.intervalID = setInterval(this.getData.bind(this), 5000);
      }

      componentWillUnmount() {
      // clearInterval(this.intervalID);
    }


    // Fetch Data 
    getData = () => {
      fetch('/api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers}, ()=>console.log('customers data', customers)));
      // .then(customers => this.setState({customers}));
    }

    render(){
      var count_row = 1;
      return(<>
       <div className="container">
       <h2>ReactJs, Express, Nodemon, Cors, NodeJs, Mysql</h2>
       
       <div className="row">
       <div className="col-md-12">
       <form  onSubmit={this.handleSubmit}>
       <div className="row">
       <div className="col-md-4 offset-4">
       <Card variant="success" bg="light" variant="top" border="success">
       <div className="card-body" bg="success">
       <div className="col-md-12">
       <div>{this.state.status}</div>
       <div className="form-group">
       <Form.Control type="hidden" onChange={this.handleChange}   value={this.state.user_id} name="user_id" className="form-control" size="lg"/>
       
       <Form.Control type="text" onChange={this.handleChange} required   placeholder="Full name" value={this.state.name} name="name" className="form-control" size="lg"/>
       </div>
       </div>
       <div className="col-md-12">
       <div className="form-group">
       <Form.Control type="number" onChange={this.handleChange}  required placeholder="Phone" value={this.state.phone} name="phone" className="form-control" size="lg"/>
       </div>
       </div>
       <div className="col-md-12">
       <div className="form-group">
       <Form.Control type="email" onChange={this.handleChange} required  placeholder="Email" value={this.state.email} name="email" className="form-control" size="lg"/>
       </div>
       </div>
       <div className="col-md-12">
       <div className="form-group">
       <Form.Control type="password" onChange={this.handleChange} required  placeholder="Password" value={this.state.password} name="password" className="form-control" size="lg"/>
       </div>
       </div>

       <div className="col-md-12">
       <input type="submit" value={this.state.sub_btn} name="sub_btn" className="btn btn-success float-right btn-lg"/>
       </div>
       </div>
       </Card>
       </div>
       </div>
       </form>
       </div>
       </div>
       
       <Card variant="success" bg="light" variant="top" className="Card_table" border="success">
       <Table striped bordered hover className="t_table" size="sm">

       {this.state.customers.map(customer=>
         <tr>
         <td className="col0">{count_row++}</td>
         <td className="col1"><b>Name:</b>  {customer.name} &nbsp;&nbsp; <b>Phone:</b> {customer.phone} &nbsp;&nbsp; <b>Email:</b>  {customer.email} </td>
         <td className="col2" ><a href="" onClick={this.editRow} data-id={customer.user_id} className="btn btn-info btn-sm">Edit</a> &nbsp;&nbsp;<a href="" onClick={this.deleteRow} delete-id={customer.user_id} className="btn btn-danger btn-sm">Delete</a></td>
         </tr>
         )}
       </Table>
       </Card>
       </div>
       </>);
     }
   }