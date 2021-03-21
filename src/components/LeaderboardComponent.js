import React ,{Component,Fragment} from 'react'
import { connect } from 'react-redux'
import classes from  './LeaderboardComponent.module.css'
import { Redirect } from 'react-router'
import {withRouter} from 'react-router-dom';

import UserStatisticsComponent from './UserStatisticsComponent'
import {usersSortedWithScore,mapKeyValueObjectToArray} from './../utils'

function QuestionsList ( {users}){
    let i=1;
    return(
        
        <Fragment>
            {
                
                users!==null && users!==undefined && users.map((user)=>{
                return <UserStatisticsComponent key={user.id} id={user.id} order={i++}/> 
            })
        }
        </Fragment>
    )
}
class LeaderboardComponent extends Component{
    
    state = {
        
    }

    render(){
        const {users,autheduser} = this.props
        if(autheduser===undefined)
            return (<Redirect   to={{pathname: "/login",state: { referrer: this.props.location }}}/>)


        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    <QuestionsList users={users}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({users,autheduser})=>{
    let  _users  = mapKeyValueObjectToArray(users);
    _users = usersSortedWithScore(_users);
    return {
        users:_users,
        autheduser
    }
}
export default connect(mapStateToProps)(withRouter(LeaderboardComponent))