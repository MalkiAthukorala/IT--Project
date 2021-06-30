import React, {Component} from 'react'
import{BrowserRouter,Route} from 'react-router-dom'
import CreateInventory from './components/CreateInventory';
import EditInventory from './components/EditInventory';
import Home from './components/Home';
import NavBar from './components/NavBar';
import InventoryDetails from './components/InventoryDetails';

export default class App extends Component{
  render(){
    return(

      <BrowserRouter>

        <div className ="container">
            <NavBar/>
            <Route path = "/" exact component = {Home}></Route>
            <Route path = "/add" component = {CreateInventory}></Route>
            <Route path = "/edit/:id" component = {EditInventory}></Route>
            <Route path = "/inventory/:id" component = {InventoryDetails}></Route>
        </div>
      </BrowserRouter>
    )
  }
}