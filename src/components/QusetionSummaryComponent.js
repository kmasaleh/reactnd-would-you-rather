import React, {Component} from 'react'
import { connect } from 'react-redux'
import avatar from './../assets/avatar-2155431_1920.png'
import classes from './QusetionSummaryComponent.module.css'
import {filterKeyValueObject} from '../utils'
import {Redirect,Link} from 'react-router-dom'

class QuestionSummaryComponent  extends Component{
    
    handleViewPull = (event)=>{
        event.preventDefault();
        this.setState({toResult:true});
    }

    render(){
        const {question,user} = this.props;
        const option1 = {
            text : question.optionOne.text,
        }
        const qurstionPath = `/result/${question.id}`;

        return  (
            <div className={classes.container}>
                <div className={classes.header}><b>{user.name} asks:</b></div>
                <div className={classes.sideBar}>
                    <img className={classes.avatar} src={avatar} alt="avatar"></img>
                </div>
                <div className={classes.content}>
                    <div >
                        <div className={classes.label}>Would you rather</div>
                        <div style={{textAlign:'left',paddingLeft:15}}>
                            <p>... {option1.text.substring(0,20)} ... </p>
                        </div>
                        <div style={{padding:15}}>
                            <Link to={qurstionPath}>
                                <input type="button" value="View Pull" className = {classes.submit} />
                            </Link>
                        </div>
                   </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({questions,users},{id})=>{

    const question = filterKeyValueObject(questions,(e=>e.id===id));
    const user  = filterKeyValueObject(users,(e=>e.id===question?.author));
    return {   
        question : question,
        user: user
    };
}
const connectedQuestionSummaryComponent = connect(mapStateToProps)(QuestionSummaryComponent)
export default connectedQuestionSummaryComponent;