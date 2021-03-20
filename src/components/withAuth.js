import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

const withAuth = (Component) => {
  //const AuthRoute = () => {
    const {authedUser} = this.props
    const isAuth = authedUser!==undefined
    if (isAuth) {
      return <Component />;
    } else {
      return <Redirect to="/login" />;
    }
  //};

  //return AuthRoute;
};



const mapStateToProps = ({users,autheduser})=>{

    const authedUser  = users[autheduser]
    return {   
        authedUser
    };
}
const connectedwithAuth = connect(mapStateToProps)(withAuth)
export default connectedwithAuth;