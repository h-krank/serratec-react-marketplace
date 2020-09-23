import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Dashboard from "../Pages/Dashboard"
import Tarefas from "../Pages/Tarefas"
import Login from "../Pages/Login"

const Routes = () => (
    <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/tarefas" component={Tarefas} />
    </Switch>
)


export default Routes;