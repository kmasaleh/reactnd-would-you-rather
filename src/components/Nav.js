import React from 'react'
import classes from './Nav.module.css'
import QuestionResult from './QuestionResultComponent'
import {NavLink } from 'react-router-dom'

export default function Nav(){
    return(
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/result/8xf0y6ziyjabvozdd253nd' exact activeClassName={classes.active}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/aa/8xf0y6ziyjabvozdd253nd' exact activeClassName={classes.active}>
                        any
                    </NavLink>
                </li>

            </ul>
        </nav>
    );
}