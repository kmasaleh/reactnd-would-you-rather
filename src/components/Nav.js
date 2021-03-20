import React, { Component } from 'react'
import classes from './Nav.module.css'
import {NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {ACTION_FACTORY} from './../actions/actions'
import logo from './../logo.svg';
import {avatarUrl} from './../utils'

class Nav extends Component {
     
    
    handleLogout =()=>{
        const {user,dispatch} = this.props;
        dispatch(ACTION_FACTORY.createSignoutUser(user.id));
    }
    render(){
        const {user} = this.props;
        return(
            <nav className='nav'  role="navigation"  aria-label="main navigation">

                <ul>
                    <li>
                        <img src={logo} className="App-logo" alt="logo" style={{width:60,height:60,display:'inline-block'}}/>
                    </li>

                    <li>
                        <NavLink to='/home' exact activeClassName={classes.active}>
                            Home
                        </NavLink>
                    </li>
                    {
                        user!==undefined &&
                        <li>
                            <NavLink to='/add' exact activeClassName={classes.active}>
                                New Question
                            </NavLink>
                        </li>
                    }

                    {
                        user!==undefined &&
                        <li>
                            <NavLink to='/leaderboard' exact activeClassName={classes.active}>
                                Leader Board
                            </NavLink>
                        </li>
                    }
                    { 
                        user!==undefined &&
                            (<li>
                                Hello <b><i>{user.name}</i></b>
                                <img src={avatarUrl(user)} alt='avatar' className={classes.avatar} style={{width:40,height:40}}/>
                            </li>)
                    }
                    
                     {user !==undefined && (<li>           
                            <NavLink to='/login'     onClick={this.handleLogout}>
                                Logout
                            </NavLink>
                            </li>)
                        }

                </ul>
            </nav>
        );
    }
}


const mapStateToProps = ({users,autheduser})=>{
    let user = undefined;
    if(autheduser) 
        user = users[autheduser];
    return {   
        user
    };
    
}

export default connect(mapStateToProps)(Nav);



/*
                    <li>
                        <NavLink to='/question/8xf0y6ziyjabvozdd253nd' exact activeClassName={classes.active}>
                            Some Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/submit/8xf0y6ziyjabvozdd253nd' exact activeClassName={classes.active}>
                            submit Question
                        </NavLink>
                    </li>

*/