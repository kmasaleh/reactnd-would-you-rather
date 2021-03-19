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
import QuestionSummaryComponent from './components/QusetionSummaryComponent'
import HomeComponent from './components/HomeComponent';

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
          {
            this.loaded===false 
            ?  null
            : 
              <Fragment>
              <div> 
                  <Route path="/home" exact component={HomeComponent} />
              </div>
 
              <div> 
                  <Route path="/result/:id" exact render ={({match})=>{
                  return (<QuestionResultComponent id={match.params.id}/>)
                    }}/>
              </div>
              <div> 
                  <Route path="/login" exact component={Login} />
              </div>
              <div> 
                  <Route path="/question/:id" exact render ={({match})=>{
                  return (<QuestionSummaryComponent id={match.params.id}/>)
                    }}/>
              </div>

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
              <Login/>
              <QuestionResultComponent id={'8xf0y6ziyjabvozdd253nd'}/>
              <QuestionVoteSubmitComponent id={'8xf0y6ziyjabvozdd253nd'}/>
              <UserStatisticsComponent id='tylermcginnis'/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>

*/