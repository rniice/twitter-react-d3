/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import { createStructuredSelector } from 'reselect';

import {
  selectTwitterData,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

import { selectTwitterHash } from './selectors';

import { changeTwitterHash } from './actions';
import { loadTwitterData } from '../App/actions';

// import RepoListItem from 'containers/RepoListItem';
import Button from 'components/Button';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RD3PIE from 'components/RD3PIE';


import styles from './styles.css';

export class HomePage extends React.Component {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
    /* if (this.props.twitterhash && this.props.twitterhash.trim().length > 0) {
      this.props.onSubmitForm();
    } */
  }
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  // changed route to '/about'
  openAboutPage = () => {
    this.openRoute('/about');
  };

  // changed route to '/github'
  openGitHubPage = () => {
    this.openRoute('/github');
  };

  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);
    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.twitterdata !== false) {
      mainContent = (<RD3PIE items={this.props.twitterdata} />);
    }

    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <section className={`${styles.textSection} ${styles.centered}`}>
            <H2>Follow a Visualization of Most Retweeted Tweets</H2>
          </section>
          <section className={`${styles.textSection} ${styles.centered}`}>
            <form className={styles.usernameForm} onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">Hashtag:
                <span className={styles.atPrefix}>#</span>
                <input
                  id="username"
                  className={styles.input}
                  type="text"
                  placeholder="pokemon"
                  value={this.props.twitterhash}
                  onChange={this.props.onChangeTwitterHash}
                />
              </label>
            </form>
            {mainContent}
          </section>
          <Button handleRoute={this.openAboutPage}>About</Button>
          <Button handleRoute={this.openGitHubPage}>GitHub</Button>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  twitterdata: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  twitterhash: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
  onChangeTwitterHash: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeTwitterHash: (evt) => dispatch(changeTwitterHash(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadTwitterData());
    },

    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  twitterdata: selectTwitterData(),
  twitterhash: selectTwitterHash(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
