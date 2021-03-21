import React, {Component} from 'react'
import { connect } from 'react-redux'
import classes from './QuestionVoteSubmitComponent.module.css'
import {avatarUrl} from '../utils'
import { handleSubmitVote} from './../actions/actions'
import {Redirect } from 'react-router-dom'
class QuestionVoteSubmitComponent  extends Component{

    state = {
        answer : '',
        submitted:false,
    }
    
    handleSubmit = (e)=>{
        e.preventDefault();
        const {question,authedUser,dispatch} = this.props;
        const {answer} = this.state;
        dispatch(handleSubmitVote({question,answer,user:authedUser}))
        this.setState({submitted:true})
    }

    voteForOptionOne = (e)=>{
        this.setState({answer:"optionOne"})
    }
    voteForOptionTwo = (e)=>{
        this.setState({answer:"optionTwo"})
    }

    render(){
        
        const {question,author} = this.props;
        const option1 = {
            text : question.optionOne.text,
            votes : question.optionOne.votes.length,
        }
        const option2 = {
            text : question.optionTwo.text,
            votes : question.optionTwo.votes.length,
        }
        const {submitted} = this.state;
        return submitted?
            <Redirect to={`/questions/${question.id}`} />
            :
        (
            <div className={classes.container}>
                <div className={classes.header}><b>{author.name} asks:</b></div>
                <div className={classes.sideBar}>
                    <img className={classes.avatar} src={avatarUrl(author)} alt="avatar"></img>
                </div>
                <div className={classes.content}>
                    <div >
                        <div className={classes.label}>Would you rather ...</div>
                        <div style={{textAlign:'left',paddingLeft:15}}>
                            <input   type="radio" id="op1" name="options" value="op1" onClick={this.voteForOptionOne}/>{option1.text} <br/>
                            <input type="radio" id="op2" name="options" value="op2" onClick={this.voteForOptionTwo}/>{option2.text}
                        </div>
                        <div style={{padding:15}}>
                            <input type="button" value="Submit" className = {classes.submit} onClick={this.handleSubmit}/>
                        </div>
                   </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({questions,users,autheduser},{id})=>{

    const question = questions[id]
    const author  = users[question.author]
    const authedUser = users[autheduser]
    return {   
        question,
        author,
        authedUser
    };
}
const connectedQuestionVoteSubmitComponent = connect(mapStateToProps)(QuestionVoteSubmitComponent)
export default connectedQuestionVoteSubmitComponent;