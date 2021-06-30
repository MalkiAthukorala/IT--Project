import React, { Component } from 'react';
import axios from 'axios';

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class CreateInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: "",
            date: new Date(),
            category: "",
            quantity: "",

            formErrors: {
                name: ""

            }

        }
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;

        //validation
        let formErrors = this.state.formErrors;
        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 3
                        ? "Minimum charchter must be 3"
                        : "";
                break;

          
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));

        this.setState({
            ...this.state,
            [name]: value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!formValid(this.state.formErrors)) {
            console.error("FORM INVALID-DISPLAY ERROR");
        }

        const { name, eid, pDate, category,quantity } = this.state;
        const data = {
            name: name,
            id: eid,
            date: pDate,
            category: category,
            quantity : quantity
        }
        //console.log(data)
        axios.post("http://localhost:8000/add", data).then((res) => {
            if (res.data.success) {
                alert("Create New inventory")
                this.setState(
                    {
                        name: "",
                        id: "",
                        date: new Date(),
                        category: "",
                        quantity: "",


                    }
                )
            };
        });
    };

    render() {
        const { formErrors } = this.state;
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Create New Inventory</h1>
                <form className="needs-validation" noValidate>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}>Inventory Name</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter Inventory Name"
                            value={this.state.name}
                            onChange={this.handleInputChange} />

                        {formErrors.name.length > 3 && (
                            <span style={{ color: 'red' }} className="errorMessage">{formErrors.name}</span>
                        )}
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}>Inventory ID</label>
                        <input type="text"
                            className="form-control"
                            name="eid"
                            placeholder="Enter Inventory ID"
                            value={this.state.eid}
                            onChange={this.handleInputChange} />
                    </div>




                    <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label for="type"> Leave Type : </label> <label for="type"> Category : </label>
                    <select id="type" className="form-control" name="category" onChange={this.handleInputChange}  value={this.state.category} required>
		            <option selected>Category</option>
		            <option value="Hall">Hall</option>
		            <option value="Room">Room</option>
		            <option value="Kitchen">Kitchen</option>
                    </select>    
                    </div>



                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}> Date</label>
                        <input type="date"
                            className="form-control"
                            name="pDate"
                            placeholder="Enter Date"
                            value={this.state.pDate}
                            onChange={this.handleInputChange} />
                    </div>

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}>Quantity</label>
                        <input type="text"
                            className="form-control"
                            name="quantity"
                            placeholder="Enter Quantity"
                            value={this.state.quantity}
                            onChange={this.handleInputChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        );
    };
};