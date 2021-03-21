import React, {Component} from 'react'
import { connect } from 'react-redux'
import avatar from './../assets/avatar-2155431_1920.png'
import classes from './QusetionSummaryComponent.module.css'
import {Link} from 'react-router-dom'
import {avatarUrl} from './../utils'


class QuestionSummaryComponent  extends Component{
    
    
    constructor(props){
        super(props);
        const {question,authedUser} = this.props;

        this.state ={
            toVote : authedUser.answers[question.id]===undefined
        }
    
    }

    handleViewPull = (event)=>{
        event.preventDefault();
    }

    render(){
        const {question,author} = this.props;
        const option1 = {
            text : question.optionOne.text,
        }
        const {toVote} = this.state;
        const questionPath = `${toVote?'/submit/':'/questions/'}${question.id}`;

        return  (
            <div className={classes.container}>
                <div className={classes.header}><b>{author.name} asks:</b></div>
                <div className={classes.sideBar}>
                    <img className={classes.avatar} src={avatarUrl(author)} alt="avatar"></img>
                </div>
                <div className={classes.content}>
                    <div >
                        <div className={classes.label}>Would you rather</div>
                        <div style={{textAlign:'left',paddingLeft:15}}>
                            <p>... {option1.text.substring(0,20)} ... </p>
                        </div>
                        <div style={{padding:15}}>
                            <Link to={questionPath}>
                                <input type="button" value="View Pull" className = {classes.submit} />
                            </Link>
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
    const authedUser  = users[autheduser]
    return {   
        question : question,
        author,
        authedUser
    };
}
const connectedQuestionSummaryComponent = connect(mapStateToProps)(QuestionSummaryComponent)
export default connectedQuestionSummaryComponent;