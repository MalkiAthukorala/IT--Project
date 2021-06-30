import React, {Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Home extends Component{
constructor(props){
  super(props);
  this.state={
    inventory:[] 
  }

} 

componentDidMount(){
  this.retrieveInventory();
}

retrieveInventory(){
  axios.get(`http://localhost:8000/inventory`).then(res=>{
  if(res.data.success){
      this.setState({
        inventory:res.data.existingInventory
      });
      console.log(this.state.inventory);

  }
     
  });
}

onDelete = (id) => {
    axios.delete(`http://localhost:8000/inventory/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      this.retrieveInventory();
    })
  }
  
  filterData(inventory,searchKey){
    const result=inventory.filter((inventory)=>
    inventory.name.toLowerCase().includes(searchKey)||
    inventory.id.toLowerCase().includes(searchKey)||
    inventory.date.toLowerCase().includes(searchKey)||
    inventory.category.toLowerCase().includes(searchKey)
    
    )
    this.setState({inventory:result})
  }
  
  
  
  handleSearchArea=(e)=>{
    const searchKey=e.currentTarget.value;
    axios.get("http://localhost:8000/inventory").then(res =>{
      if(res.data.success){
        this.filterData(res.data.existingInventory,searchKey)
      }
    });
  }

  render(){
    return(
        
      <div className="container" >
         
        <div className="row">
        <div className="col-lg-9 mt-2 mb-2">

</div>
            <div className="col-lg-3 mt-2 mb-2 ">
              <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}></input>

            </div>
        </div>
        <p>All Inventories.</p>
        <table className = "table">
          <thead>
            <tr>

              <th scope = "col">#</th>
              <th scope = "col">Inventory Id</th>
              <th scope = "col">Inventory name</th>
              <th scope = "col">Date</th>
              <th scope = "col">Category</th>
              <th scope = "col">Quantity</th>
              <th scope = "col">Action</th>

            </tr>
          </thead>

              <tbody>

                {this.state.inventory.map((inventorys,index) =>(

                    <tr key ={index}> 

                        <th scope ="row"> {index+1}</th>
                        <td>
                            <a href={`/inventory/${inventorys._id}`}style={{textDecoration:'none'}}>
                            {inventorys.id}
                            </a>

                        </td>

                        <td>{inventorys.name}</td>
                        <td>{inventorys.date}</td>
                        <td>{inventorys.category}</td>
                        <td>{inventorys.quantity}</td>
                        <td>
                          <Link className="btn btn-warning " to={`/edit/${inventorys._id}`}>
                            <i className ="fas fa-edit"></i>&nbsp;Edit
                          </Link>
                          &nbsp;
                          <Link className="btn btn-danger " to="#" onClick={()=>this.onDelete(inventorys._id)}>
                            <i className ="fas fa-trash-alt"></i>&nbsp;delete
                          </Link>
                        </td>


                    </tr>    

                ))}

              </tbody>
        </table>

        <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Create New Inventory</a></button>

      </div>


    )
  }
}


