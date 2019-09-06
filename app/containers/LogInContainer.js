import { connect } from 'react-redux'
import { authApi } from "../actions";
import { LogIn } from "@components/auth/LogIn";


mapStateToProps = state => ({
    user: state.user,
  });

const mapDispatchToProps = dispatch => ({
onLogin: (user) => {
    dispatch(getUser(user));
},
});

const LoginContainer = connect(
mapStateToProps, 
mapDispatchToProps)
(LogIn);

export default LoginContainer;