import db from '../db';
import Header from './Header';
import Footer from './Footer';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import ProfileFavorites from '../components/ProfileFavorites';
import Register from '../components/Register';
import Settings from '../components/Settings';
import { store } from '../store';
import { push } from 'react-router-redux';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    // if (nextProps.redirectTo) {
    //   // this.context.router.replace(nextProps.redirectTo);
    //   store.dispatch(push(nextProps.redirectTo));
    //   this.props.onRedirect();
    // }
  }

  componentDidMount() {
    // const token = window.localStorage.getItem('jwt');
    // if (token) {
    //   db.setToken(token);
    // }

    this.props.onLoad();
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header appName={this.props.appName} currentUser={this.props.currentUser} />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
          <Footer appName={this.props.appName} />
        </div>
      );
    }

    return (
      <div>
        <Header appName={this.props.appName} currentUser={this.props.currentUser} />
        <Footer appName={this.props.appName} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
