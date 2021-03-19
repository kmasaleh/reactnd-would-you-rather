import React, { Component } from 'react'
import classes from './Nav.module.css'
import {NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {ACTION_FACTORY} from './../actions/actions'
import logo from './../logo.svg';
class Nav extends Component {
     
    
    handleLogout =()=>{
        const {autheduser,dispatch} = this.props;
        dispatch(ACTION_FACTORY.createSignoutUser(autheduser));
    }
    render(){
        return(
            <nav className='nav'  role="navigation"  aria-label="main navigation">

                <ul>
                    <li>
                        <img src={logo} className="App-logo" alt="logo" style={{width:40,height:40,display:'inline-block'}}/>
                    </li>

                    <li>
                        <NavLink to='/home' exact activeClassName={classes.active}>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/question/8xf0y6ziyjabvozdd253nd' exact activeClassName={classes.active}>
                            Some Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/login' exact activeClassName={classes.active}>
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/login'     onClick={this.handleLogout}>
                            Logout
                        </NavLink>
                    </li>

                </ul>
            </nav>
        );
    }
}


const mapStateToProps = ({autheduser})=>{
    return {   
        autheduser
    };
    
}

export default connect(mapStateToProps)(Nav);

