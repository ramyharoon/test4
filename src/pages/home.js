import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SagaUpdateUserInfoAction, SagaLogoutAction } from '../sagas/apiSaga';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BlockUi from 'react-block-ui';
import Loader from 'react-loaders';
import { checkUIBlock } from '../services';
import { API } from '../constants';
import { Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { setCustomerTypeAction, setCustomerIdAction } from '../reducers/home';

const mapStateToProps = store => ({
  account: store.account,
  apiData: store.apiState,
  state: store.home,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    doUpdate: SagaUpdateUserInfoAction,
    doLogout: SagaLogoutAction,
    setCustomerType: setCustomerTypeAction,
    setCustomerId: setCustomerIdAction,
  }, dispatch)
)

class Home extends Component {

  onClickSubmit = () => {
    this.props.doUpdate(this.props.state.type, this.props.state.id)
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}>
        <BlockUi tag="div" blocking={checkUIBlock(this.props.apiData[API.UPDATE_INFO.ID]) || checkUIBlock(this.props.apiData[API.USER_INFO.ID])} className="block-overlay"
          loader={<Loader color="#333333" active type={"ball-spin-fade-loader"}/>}>
            <Row className="m-5">
              <Col md={{size: 4, offset: 4}} sm={{size: 6, offset: 3}} >
                <Col md={{size: 4, offset: 8}} sm={{size: 6, offset: 6}}><Button onClick={e => {this.props.doLogout();}}>Logout</Button></Col>
                <Row className="m-2">
                  <Col>balance: {this.props.account.userInfo.balance} USD</Col>
                </Row>
                <Row className="m-2">
                  <Col>Expire in: {this.props.account.userInfo.expiration_date}</Col>
                </Row>
                <Row className="m-2">
                  <Col md="6">
                    <Button
                      className="form-control"
                      color={'def' == this.props.state.type ? 'success' : 'primary'}
                      onClick={e => {this.props.setCustomerType('def')}}
                    >
                      Default
                    </Button>
                  </Col>
                </Row>
                <Row className="m-2">
                  <Col md="6">
                    <Button
                      className="form-control"
                      color={'no' == this.props.state.type ? 'success' : 'primary'}
                      onClick={e => {this.props.setCustomerType('no')}}
                    >
                      No Caller ID
                    </Button>
                  </Col>
                </Row>
                <Row className="m-2">
                  <Col md="6">
                    <Button
                      className="form-control"
                      color={'cus' == this.props.state.type ? 'success' : 'primary'}
                      onClick={e => {this.props.setCustomerType('cus')}}
                    >
                      Custom Caller ID
                    </Button>
                  </Col>
                  <Col md="6">
                    { 'cus' == this.props.state.type &&
                      <Input
                        type="number"
                        value={this.props.state.id}
                        onChange={e => this.props.setCustomerId(e.target.value)}
                      />
                    }
                  </Col>
                </Row>
                <Row className="m-2">
                  <Col>
                    <Button className="form-control" color="danger" onClick={this.onClickSubmit}>Submit</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
        </BlockUi>
      </ReactCSSTransitionGroup>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);