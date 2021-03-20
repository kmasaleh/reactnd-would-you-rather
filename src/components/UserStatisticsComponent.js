import React, {Component} from 'react'
import { connect } from 'react-redux'
import avatar from './../assets/avatar-2155431_1920.png'
import classes from './UserStatisticsComponent.module.css'
import {filterKeyValueObject} from '../utils'


class UserStatisticsComponent  extends Component{

    render(){
        console.log(this.props);
        const {user} = this.props;
        const answered = Object.entries(user.answers).length;
        const created = user.questions.length;

        return (
            <div className={classes.container}>
                <div className={classes.header}><b>{user.name} </b></div>
                <div className={classes.sideBar}>
                    <img className={classes.avatar} src={avatar} alt="avatar"></img>
                </div>
                <div className={classes.content}>
                    <div className={classes.result} >
                        <div className={classes.rightborder}></div>
                        <div style={{padding:15}}>Answered questions {answered}</div>
                        <div style={{padding:15}}>Created questions {created}</div>
                   </div>
                   <div className={classes.score}>
                        <div className={classes.scoreLabel} >Score</div>
                        
                        <div className={classes.scoreNumber} >
                            <div className={classes.circle}>
                                <div className={classes.number}>{answered+created}</div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({users},{id})=>{

    const user  = filterKeyValueObject(users,(e=>e.id===id));
    return {   
        user: user
    };
}
const connectedUserStatisticsComponent = connect(mapStateToProps)(UserStatisticsComponent)
export default connectedUserStatisticsComponent;