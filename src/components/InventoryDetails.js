import React, { Component } from 'react';
import axios from 'axios';

export default class InventoryDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            inventory:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;
        
        axios.get(`http://localhost:8000/inventory/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    inventory:res.data.inventory
                });
                console.log(this.state.inventory);

            }
        });
    }

    render() {

            const {id,name,date,category,quantity} = this.state.inventory;

        return (
            <div style = {{marginTop:'20px'}}>
             <h4>{id}</h4>   
            <hr/>

            <d1 className = "row">
                <dt className="col-sm-3">Id</dt>
                <dd className="col-sm-9">{id}</dd>

                <dt className="col-sm-3">Name</dt>
                <dd className="col-sm-9">{name}</dd> 

                <dt className="col-sm-3">Date</dt>
                <dd className="col-sm-9">{date}</dd>

                <dt className="col-sm-3">Category</dt>
                <dd className="col-sm-9">{category}</dd>

                <dt className="col-sm-3">Quantity</dt>
                <dd className="col-sm-9">{quantity}</dd>


            </d1>



            </div>
        )
    }
}
