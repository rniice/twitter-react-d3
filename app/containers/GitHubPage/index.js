/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import Button from 'components/Button';
import H1 from 'components/H1';
// import A from 'components/A';

import styles from './styles.css';

export class GitHubPage extends React.Component {

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/'
   */
  openHomePage = () => {
    this.openRoute('/');
  };

  render() {
    return (
      <div>
        <Helmet
          title="GitHub Page"
          meta={[
            { name: 'description', content: 'Feature page of React.js Boilerplate application' },
          ]}
        />
        <H1>GitHub Contents</H1>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>Quick scaffolding</p>
            <p>Automate the creation of components, containers, routes, selectors
            and sagas - and their tests - right from the CLI!</p>
          </li>
        </ul>

        <h4> <a href="https://github.com/rniice/twitter-react-d3" target="_blank">GitHub Source - Twitter React D3</a> </h4>

        <Button handleRoute={this.openHomePage}>Home</Button>
      </div>
    );
  }
}
GitHubPage.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(GitHubPage);
