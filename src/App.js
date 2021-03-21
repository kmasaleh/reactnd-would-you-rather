import logo from './logo.svg';
import './App.css';
import QuestionResultComponent from './components/QuestionResultComponent';
import {connect} from 'react-redux'
import { Component ,Fragment} from 'react';
import {getAllDataAction} from './actions/actions'
import QuestionVoteSubmitComponent from './components/QuestionVoteSubmitComponent'
import UserStatisticsComponent from './components/UserStatisticsComponent'
import {BrowserRouter as Router,Redirect,Route,Switch } from 'react-router-dom'

import Nav from './components/Nav'
import Login from './components/Login';
import QuestionSummaryComponent from './components/QusetionSummaryComponent'
import HomeComponent from './components/HomeComponent';
import QuestionSubmitComponent from './components/QuestionVoteSubmitComponent'
import LeaderboardComponent from './components/LeaderboardComponent'
import NewQuestionComponent from './components/NewQuestionComponent'
import Error from './components/404'

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
        
            <div className="App">
              <Nav/>
              {
                this.loaded===false 
                ?  null
                : 
                  <Fragment>
                    <Switch>
                    <Route path="/" exact component={HomeComponent} />
                      <Route path="/home" exact component={HomeComponent} />
                      <Route path="/add" exact component={NewQuestionComponent} />
                      <Route path="/leaderboard" exact component={LeaderboardComponent} />
                      
                      <Route path="/questions/:id" exact render ={({match})=>{
                        return (<QuestionResultComponent id={match.params.id}/>)
                          }}/>
                      <Route path="/submit/:id" exact render ={({match})=>{
                        return (<QuestionSubmitComponent id={match.params.id}/>)
                          }}/>
                      
                      <Route path="/login" exact component={Login} />
                      <Route path="/404" exact component={Error} />                      
                      <Route path="" exact component={Error} />                      
                    </Switch>
                  </Fragment>
              }
            </div>
        
      </Router>
    );
  }
}




const connectedApp = connect()(App)

export default connectedApp;


/*
<Route path="" exact component={Error} />
              <Redirect to="/404"   />
              <Login/>
              <QuestionResultComponent id={'8xf0y6ziyjabvozdd253nd'}/>
              <QuestionVoteSubmitComponent id={'8xf0y6ziyjabvozdd253nd'}/>
              <UserStatisticsComponent id='tylermcginnis'/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
<img src={process.env.PUBLIC_URL + '/avatar-2155431_1920.png'} alt="logo" />
*/