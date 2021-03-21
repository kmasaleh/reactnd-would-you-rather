import React, {Component} from 'react'
import { connect } from 'react-redux'
import classes from './QuestionResultComponent.module.css'
import {avatarUrl,filterKeyValueObject, imgUrl} from './../utils'
import QuestionVoteSubmitComponent from './QuestionVoteSubmitComponent'
import { Redirect } from 'react-router'
import {withRouter} from 'react-router-dom';


class QuestionResultComponent  extends Component{

    render(){
        console.log(this.props);
        const {question,author,autheduser} = this.props;


        if(question===undefined){
            return (<Redirect   to={{pathname: "/login",state: { referrer: "/404"}}}/>)
        }
            
        const totalVotes = (question.optionOne.votes.length+question.optionTwo.votes.length);
        const option1 = {
            text : question.optionOne.text,
            votes : question.optionOne.votes.length,
            ratio : totalVotes>0?(question.optionOne.votes.length*100/totalVotes):0,
            answered : question.optionOne.votes.findIndex(v=>v===autheduser)!==-1
        }
        const option2 = {
            text : question.optionTwo.text,
            votes : question.optionTwo.votes.length,
            ratio : totalVotes>0?(question.optionTwo.votes.length*100/totalVotes):0,
            answered : question.optionTwo.votes.findIndex(v=>v===autheduser)!==-1
        }
        
        if(autheduser===undefined)
            return (<Redirect   to={{pathname: "/login",state: { referrer: this.props.location }}}/>)
            
        //if the user write the /questions/id he should the both types of polls answered an unanswered
        // so i intercept the call here and if the question is answered i redirect it to the vote component    
        if(!option1.answered && !option2.answered)
                //return <Redirect to={`/submit/${question.id}`} />
                return <QuestionVoteSubmitComponent id={question.id} />


            return (
            <div className={classes.container}>
                <div className={classes.header}>Asked by <b>{author.name}</b></div>
                <div className={classes.sideBar}>
                    <div className={classes.rightborder}></div>
                    <img className={classes.avatar} src={avatarUrl(author)} alt="any"></img>
                </div>
                
                <div className={classes.label}>Results:</div>
                <div className={classes.option1}>
                    {option1.answered ? <img src={imgUrl('comment.png')} className={classes.answeredBadge}  alt="badge"/> :null}
                    Would you rather {option1.text} ?
                    <progress className={classes.progress}   value={option1.ratio} max="100"> {option1.ratio}% </progress>
                    <div className={classes.vote}>{option1.votes} out of {option1.votes+option2.votes} votes</div>
                </div>
                <div className={classes.option2}>
                    {option2.answered? <img src={imgUrl('comment.png')} className={classes.answeredBadge}  alt="badge"/> : null}
                    Would you rather {option2.text} ?
                    <progress className={classes.progress}  value={option2.ratio} max="100"> {option2.ratio}% </progress>
                    <div className={classes.vote} >{option2.votes} out of {option1.votes+option2.votes} votes</div>
                </div>


                
            </div>
        )
    }
}

const mapStateToProps = ({autheduser,questions,users},{id})=>{
    const question = filterKeyValueObject(questions,(e=>e.id===id));
    const author  = filterKeyValueObject(users,(e=>e.id===question?.author));
    return {   
        question : question,
        author,
        autheduser
    };
    
}
const connectedQuestionResult = connect( mapStateToProps)(withRouter(QuestionResultComponent))
export default connectedQuestionResult;