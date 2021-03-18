import React, {Component} from 'react'
import { connect } from 'react-redux'
import avatar from './../assets/avatar-2155431_1920.png'
import './QuestionResultComponent.css'
import {filterKeyValueObject} from './../utils'


class QuestionResultComponent  extends Component{

    render(){
        console.log(this.props);
        const {question,user} = this.props;
        const totalVotes = (question.optionOne.votes.length+question.optionTwo.votes.length);
        const option1 = {
            text : question.optionOne.text,
            votes : question.optionOne.votes.length,
            ratio : totalVotes>0?(question.optionOne.votes.length*100/totalVotes):0
        }
        const option2 = {
            text : question.optionTwo.text,
            votes : question.optionTwo.votes.length,
            ratio : totalVotes>0?(question.optionTwo.votes.length*100/totalVotes):0
        }

        return (
            <div className='container'>
                <div className='header'>Asked by <b>{user.name}</b></div>
                <div className='side-bar'>
                    <div className='rightborder'></div>
                    <img className='avatar' src
                    ={avatar} alt="any"></img>
                </div>
                
                <div className='label'>Results:</div>
                <div className='option1'>
                    Would you rather {option1.text} ?
                    <progress className='progress'   value={option1.ratio} max="100"> {option1.ratio}% </progress>
                    <div className='vote'>{option1.votes} out of {option1.votes+option2.votes} votes</div>
                </div>
                <div className='option2'>
                    Would you rather {option2.text} ?
                    <progress className='progress'  value={option2.ratio} max="100"> {option2.ratio}% </progress>
                    <div className='vote' >{option2.votes} out of {option1.votes+option2.votes} votes</div>
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
    /*
    var output = Object.entries(questions).map(([key, value]) => (value));
    const found = output.filter(e=> {
        return e.id===id
    })[0];
    return  {question:found}*/
}
const connectedQuestionResult = connect(mapStateToProps)(QuestionResultComponent)
export default connectedQuestionResult;