import React ,{Component,Fragment} from 'react'
import { connect } from 'react-redux'
import classes from  './HomeComponent.module.css'
import {mapKeyValueObjectToArray,isAuthenticatedUser} from './../utils'
import QuestionSummaryComponent from './QusetionSummaryComponent'
import { getAnsweredQuestionsForUser,getUnansweredQuestionsForUser} from './../utils'
import { Redirect ,withRouter} from 'react-router'

function QuestionsList ( {questions}){
    return(
        <Fragment>
            {
            questions!==null && questions!==undefined && questions.map((question)=>{
              return <QuestionSummaryComponent key={question.id} id={question.id}/> 
            })
        }
        </Fragment>
    )
}
class Home extends Component{
    
    state = {
        showAnswered : false
    }
    handleAnsweredClick = ($event)=> {
        $event.preventDefault( )
        this.setState({showAnswered:true})
    }
    handleUnansweredClick = ($event)=> {
        $event.preventDefault( )
        this.setState({showAnswered:false})
    }

    render(){
        const {answered,non,autheduser} = this.props;
        const {showAnswered} = this.state;

        if(! isAuthenticatedUser(autheduser))
            return (<Redirect   to={{pathname: "/login",state: { referrer: this.props.location }}}/>)

        return(
            <div className={classes.container}>
                <header className={classes.header}>
                    <button onClick={this.handleUnansweredClick} className={!showAnswered?classes.activeBtn:''}>Unanswered Questions</button>
                    <button onClick={this.handleAnsweredClick} className={showAnswered?classes.activeBtn:''}>Answered Questions</button>
                </header>
                <div className={classes.content}>
                    {
                        showAnswered ?
                         <QuestionsList questions={answered}/>
                        : <QuestionsList questions={non}/>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state )=>{
    const {questions, autheduser  } = state;
    const _questions  =   mapKeyValueObjectToArray(questions);
    
    return {
        answered : getAnsweredQuestionsForUser(_questions,autheduser),
        non :   getUnansweredQuestionsForUser(_questions,autheduser),
        autheduser
    }
}
export default connect(mapStateToProps)(withRouter(Home))