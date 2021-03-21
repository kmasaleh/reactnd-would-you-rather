import './App.css';
import QuestionResultComponent from './components/QuestionResultComponent';
import {connect} from 'react-redux'
import { Component ,Fragment} from 'react';
import {getAllDataAction} from './actions/actions'
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Login from './components/Login';
import HomeComponent from './components/HomeComponent';
import QuestionSubmitComponent from './components/QuestionVoteSubmitComponent'
import LeaderboardComponent from './components/LeaderboardComponent'
import NewQuestionComponent from './components/NewQuestionComponent'
import Error from './components/404'

class  App extends Component {

  state ={
    loaded:false
  }
  async componentDidMount(){
    await this.props.getAllDataAction();
    this.setState({loaded:true});
  }

  render(){
    if(this.state.loaded===false )
      return  null;
    
      return (
      <Router>
        
            <div className="App">
              <Nav/>
              {
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




const connectedApp = connect(null,{getAllDataAction})(App)

export default connectedApp;

