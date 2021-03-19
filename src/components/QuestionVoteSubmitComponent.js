import React, {Component} from 'react'
import { connect } from 'react-redux'
import avatar from './../assets/avatar-2155431_1920.png'
import classes from './QuestionVoteSubmitComponent.module.css'
import {filterKeyValueObject} from '../utils'


class QuestionVoteSubmitComponent  extends Component{

    render(){
        console.log(this.props);
        const {question,user} = this.props;
        const option1 = {
            text : question.optionOne.text,
            votes : question.optionOne.votes.length,
        }
        const option2 = {
            text : question.optionTwo.text,
            votes : question.optionTwo.votes.length,
        }

        return (
            <div className={classes.container}>
                <div className={classes.header}><b>{user.name} asks:</b></div>
                <div className={classes.sideBar}>
                    <img className={classes.avatar} src={avatar} alt="avatar"></img>
                </div>
                <div className={classes.content}>
                    <div >
                        <div className={classes.label}>Would you rather ...</div>
                        <div style={{textAlign:'left',paddingLeft:15}}>
                            <input   type="radio" id="op1" name="options" value="op1" />{option1.text} <br/>
                            <input type="radio" id="op2" name="options" value="op2" />{option2.text}
                        </div>
                        <div style={{padding:15}}>
                            <input type="button" value="Submit" className = {classes.submit}/>
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
const connectedQuestionVoteSubmitComponent = connect(mapStateToProps)(QuestionVoteSubmitComponent)
export default connectedQuestionVoteSubmitComponent;