
import React, { Component } from 'react';
import axios from 'axios';

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class EditInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: "",
            date: new Date(),
            category: "",

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
                        ? "Minimum charchter must be 5"
                        : "";
                break;

            // case "mobileNo":
            // formErrors.mobileNo =
            // value.length > 10 || value.length > 10
            // ? "Must be 10 digits"
            // :"";
            // break;
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
        
        const id = this.props.match.params.id;
        if (!formValid(this.state.formErrors)) {
            console.error("FORM INVALID-DISPLAY ERROR");
        }

        const { name, eid, pDate, category, } = this.state;
        const data = {
            name: name,
            id: eid,
            date: pDate,
            category: category
        }
        //console.log(data)
        
        axios.put(`http://localhost:8000/inventory/update/${id}`, data).then((res) => {
            if (res.data.success) {
                alert("Edit New inventory")
                this.setState(
                    {
                        name: "",
                        id: "",
                        date: new Date(),
                        category: "",

                    }
                )
            };
        });
    };

    componentDidMount(){

        const id = this.props.match.params.id;
        
        axios.get(`http://localhost:8000/inventory/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    name:res.data.inventory.name,
                    eid:res.data.inventory.id,
                    pDate:res.data.inventory.pDate,
                    category:res.data.inventory.category,
                });
                console.log(this.state.inventory);

            }
        });
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Edit  Inventory</h1>
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
                        <label style={{ marginBottom: '5px' }}>Category</label>
                        <input type="text"
                            className="form-control"
                            name="category"
                            placeholder="Enter Category"
                            value={this.state.category}
                            onChange={this.handleInputChange} />
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
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Edit</button>
                </form>
            </div>
        );
    };
};