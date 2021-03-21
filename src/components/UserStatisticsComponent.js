import React, {Component} from 'react'
import { connect } from 'react-redux'
import classes from './UserStatisticsComponent.module.css'
import {filterKeyValueObject,avatarUrl} from '../utils'


class UserStatisticsComponent  extends Component{

    render(){
        console.log(this.props);
        const {user,order} = this.props;
        const answered = Object.entries(user.answers).length;
        const created = user.questions.length;
        let _class = "";
        if(order){
            switch(order)
            {
                case 1: _class = classes.gold; break;
                case 2: _class = classes.silver; break;
                case 3: _class = classes.bronze; break;
                default: _class =""
            }
        }
      
        return (
            <div className={classes.container}>
                <div className={classes.header}><b>{user.name} </b>
                {
                    //order && <img src={imgSrc} alt='medal' style={{width:30,height:30}}/>
                }
                </div>
                <div className={classes.sideBar}>
                    <img className={classes.avatar} src={avatarUrl(user)} alt="avatar"></img>
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
                            <div className={[classes.circle,_class].join(" ")}>
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