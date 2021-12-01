import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/HomePage'
import FavPage from './components/favs/FavPage'
import LoginPage from './components/login/LoginPage'
import { connect } from 'react-redux'

const PrivateRoute = ({ path, component, logged, ...rest }) => {

    // using local storage
    // let storage = localStorage.getItem('storage');
    // storage = JSON.parse(storage)
    // if (storage && storage.user) {
    //     return <Route path={path} component={component} {...rest} />
    // } else {
    //     return <Redirect to="/login" {...rest} />
    // }

    // using redux
    if (logged) {
        return <Route path={path} component={component} {...rest} />
    } else {
        return <Redirect to="/login" {...rest} />
    }
}

const Routes = ({ logged }) => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} logged={logged} />
            <PrivateRoute path="/favs" component={FavPage} logged={logged} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    )
}

const mapStateToProps = ({ user: { logged } }) => {
    return {
        logged
    }
}


export default connect(mapStateToProps)(Routes)