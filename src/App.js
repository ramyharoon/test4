import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './reducers';
import login from './pages/login';
import { ToastContainer } from 'react-toastify';
import home from './pages/home';
import { SagaGetUserInfoAction } from './sagas/apiSaga';
import { bindActionCreators } from 'redux';

const mapStateToProps = store => ({
  account: store.account,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getUserInfo: SagaGetUserInfoAction,
  }, dispatch)
)

class App extends Component {

  componentDidMount() {
    if ( null !== this.props.account.authToken)
      this.props.getUserInfo()
  }
  
  
  render() {
    return (
      <>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/home' component={home}/>
            <Route path='/login' component={login}/>
            <Redirect exact path='/' to={ null === this.props.account.authToken ? '/login' : '/home'} />
          </Switch>
        </ConnectedRouter>
        <ToastContainer/>
      </>
    );
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
