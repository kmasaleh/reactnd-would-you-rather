import logo from './logo.svg';
import './App.css';
import QuestionResultComponent from './components/QuestionResultComponent';
import {connect} from 'react-redux'
import { Component ,Fragment} from 'react';
import {getAllDataAction} from './actions/actions'
import QuestionVoteSubmitComponent from './components/QuestionVoteSubmitComponent'
import UserStatisticsComponent from './components/UserStatisticsComponent'
import {BrowserRouter as Router,Route } from 'react-router-dom'

import Nav from './components/Nav'
import Login from './components/Login';

class  App extends Component {

  constructor(){
    super();
    this.loaded=false;

  }
  async componentDidMount(){
    await this.props.dispatch(getAllDataAction())
    this.loaded=true;
    this.forceUpdate();
  }

  render(){
    return (
      <Router>
          <Fragment>
        
        <div className="App">
          <Nav/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          {
            this.loaded===false 
            ?  null
            : 
              <Fragment>
              <div> 
                  <Route path="/result/:id" exact render ={({match})=>{
                  return (<QuestionResultComponent id={match.params.id}/>)
                    }}/>
              </div>
              <Login/>
              <QuestionResultComponent id={'8xf0y6ziyjabvozdd253nd'}/>
              <QuestionVoteSubmitComponent id={'8xf0y6ziyjabvozdd253nd'}/>
              <UserStatisticsComponent id='tylermcginnis'/>

              </Fragment>
          }
        </div>
        </Fragment>
      </Router>
    );
  }
}




const connectedApp = connect()(App)

export default connectedApp;


/*

                      <QuestionResultComponent id={'8xf0y6ziyjabvozdd253nd'}/>
                      <QuestionVoteSubmitComponent id={'8xf0y6ziyjabvozdd253nd'}/>
                      <UserStatisticsComponent id='tylermcginnis'/>

*/