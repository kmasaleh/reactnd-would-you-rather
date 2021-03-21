import React, {Component} from 'react'
import { connect } from 'react-redux'
import classes from './NewQuestionComponent.module.css'
import { handleSubmitNewQuestion} from './../actions/actions'
import { Redirect } from 'react-router'
import {withRouter} from 'react-router-dom';


class NewQuestionComponent  extends Component{

    state = {
        submitted:false,
        OptionOne : "",
        OptionTwo : "",
        
    }
    
    handleSubmit = (e)=>{
        e.preventDefault();
        const {authedUser,dispatch} = this.props;
        const {OptionOne,OptionTwo} = this.state;

        if(OptionOne.length===0 || OptionTwo.length===0){
            alert('Please complete the two options ..')
            return;
        }

        let question = {
            author: authedUser.id,
            optionOneText: OptionOne,
            optionTwoText: OptionTwo
            }
        dispatch(handleSubmitNewQuestion(question))
        this.setState({submitted:true})
    }

    handleOpOneChange = (event) =>{
        this.setState({OptionOne: event.target.value});
      }
    handleOpTwoChange = (event) =>{
        this.setState({OptionTwo: event.target.value});
    }

    render(){
        
        const {authedUser} = this.props;
        const {submitted} = this.state;
        
        if(submitted )
            return <Redirect to={`/home/`} />

        if(authedUser===undefined)
            return (<Redirect   to={{pathname: "/login",state: { referrer: this.props.location }}}/>)
            
        return (
            <form onSubmit={this.handleSubmit}>
            <div className={classes.container}>
                <div className={classes.header}><b>Create New Question</b></div>
                <div className={classes.content}>
                    <div >
                        <div style={{paddingTop:20,paddingLeft:20,textAlign:'left',fontSize:18,fontWeight:600}} >Complete the question</div>
                        <p style={{paddingTop:10,paddingLeft:20,textAlign:'left',fontSize:20,fontWeight:600}}>Would you rather ...</p>
                        <div style={{textAlign:'center'}}>
                            <input   type="text" id="op1" name="op1"  className={classes.input}
                            value={this.state.OptionOne} onChange={this.handleOpOneChange}
                            />
                            <p><b>OR</b></p>
                            <input type="text" id="op2" name="op2" className={classes.input} 
                            value={this.state.OptionTwo} onChange={this.handleOpTwoChange}
                            />
                        </div>
                        <div style={{paddingTop:25}}>
                           <input type="submit" value="Submit" className = {classes.submit} />
                            
                        </div>
                   </div>
                </div>
            </div>
            </form>
        )
    }
}

const mapStateToProps = ({users,autheduser})=>{

    const authedUser = users[autheduser]
    return {   
        authedUser
    };
}
const connectedNewQuestionComponent = connect(mapStateToProps)(withRouter(NewQuestionComponent))
export default connectedNewQuestionComponent;