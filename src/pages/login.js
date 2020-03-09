import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { changeUsernameAction, changePasswordAction } from '../reducers/login';
import { showError, checkUIBlock } from '../services';
import { SagaLoginAction } from '../sagas/apiSaga';
import BlockUi from 'react-block-ui';
import Loader from 'react-loaders';
import { API } from '../constants';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const mapStateToProps = store => ({
  state: store.login,
  apiData: store.apiState,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUsername: changeUsernameAction,
    setPassword: changePasswordAction,
    doLogin: SagaLoginAction,
  }, dispatch)
)

class Login extends Component {

  onClickLogin = () => {
    this.props.doLogin(
      this.props.state.username,
      this.props.state.password,
    )
  }

  render() {
    return (
      <Form>
        <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
          <BlockUi tag="div" blocking={checkUIBlock(this.props.apiData[API.LOGIN.ID])} className="block-overlay"
            loader={<Loader color="#333333" active type={"ball-spin-fade-loader"}/>}>
            <Row>
              <Col md={{ size: 4, offset: 4 }} sm={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Label for='username'>Username</Label>
                  <Input 
                    type='text'
                    id='username'
                    placeholder='Username here...'
                    value={this.props.state.username}
                    onChange={e => this.props.setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='password'>Password</Label>
                  <Input
                    type='password'
                    id='password'
                    placeholder='Password here...'
                    value={this.props.state.password}
                    onChange={e => this.props.setPassword(e.target.value)}
                  />
                </FormGroup>
                <Button onClick={this.onClickLogin}>Login</Button>
              </Col>
            </Row>
          </BlockUi>
        </ReactCSSTransitionGroup>
      </Form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);