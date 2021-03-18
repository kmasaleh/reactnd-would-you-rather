import logo from './logo.svg';
import './App.css';
import QuestionResultComponent from './components/QuestionResultComponent';
import {connect} from 'react-redux'
import { Component } from 'react';
import {getAllDataAction} from './actions/actions'



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
      this.loaded &&
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        
        <QuestionResultComponent id={'8xf0y6ziyjabvozdd253nd'}/>
      </div>
    );
  }
}




const connectedApp = connect()(App)

export default connectedApp;
