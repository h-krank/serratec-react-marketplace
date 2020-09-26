import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Search from "../pages/search"
import Home from "../pages/home"
import Login from "../pages/login"
import Product from "../pages/product"
import Dashboard from '../pages/dashboard'
import Categoria from "../pages/dashboard/categoria"
import Funcionario from "../pages/dashboard/funcionario"
import Produto from "../pages/dashboard/produto"
import Cart from '../pages/cart'
import Checkout from '../pages/checkout'


const Routes = () => (
    <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/home" component={Home}/>
        <Route path="/search" component={Search}/>
        <Route path="/product" component={Product}/>
        <Route path="/dashboard/" component={Dashboard} exact/>
        <Route path="/dashboard/categoria" component={Categoria}/>
        <Route path="/dashboard/funcionario" component={Funcionario}/>
        <Route path="/dashboard/produto" component={Produto}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/checkout" component={Checkout}/>
    </Switch>
)


export default Routes;