import React ,{Component} from 'react'
import { connect } from 'react-redux'
import classes from  './Login.module.css'
import logo from './../logo.svg';
import {mapKeyValueObjectToArray} from './../utils'
import avatar_1 from './../assets/avatar-2155431_1920.png'
import {ACTION_FACTORY} from './../actions/actions'
class Login extends Component{

    constructor(){
        super()
        this.state = {
            selectedUser :null,
            optionsState:-1
        }
    }
    onSignIn = ()=>{
        const {dispatch} = this.props;
        dispatch(ACTION_FACTORY.createSigninUser(this.state.selectedUser));
        alert('signed in..');
    }
    handleChangeselection = ($event)=>{
     //   $event.preventDefault();
        let t = $event.target.value;
        alert(`user ${t} selected ..`)
        this.setState({selectedUser:t})
        
    }
    render(){
        const {users} = this.props;
        return (
            <div className={classes.container}>
                <header className={classes.header}>
                    <h2 style={{paddingTop:15}}>Welcome to the Would You Rathre App</h2>
                    <h3 style={{paddingBottom:15}}>Please sign in to continue</h3>
                </header>
                <div>
                    <img src={logo} alt='logo' style={{width:150,height:100}}></img>
                    <p style={{fontWeight:700,fontSize:32,color:'green'}}>Sign in</p>
                    <div>
                    <select value="" name="users" id="users" className={classes.usersList} onChange={this.handleChangeselection}>
                        <option key={-1} value="" disabled>Select user ..   </option>
                        {
                            users.map( (user)=>{
                                return( <option key={user.id} value={user.id} 
                                        style={{backgroundImage:avatar_1}}>
                                        {user.name}
                                        </option>)
                            })
                        }
                    </select>
                    </div>
                    <div style={{padding:10}}>
                        <input type='button' value='Sign in' className={classes.submit} onClick={this.onSignIn}></input>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({users,autheduser})=>{
    const arr  = mapKeyValueObjectToArray(users);
    let r =  arr.map( user=> {
        return {id:user.id, name : user.name,avatar: user.avatarURL}
    });
    return {
        users : r
    }
}

export default connect(mapStateToProps)(Login)