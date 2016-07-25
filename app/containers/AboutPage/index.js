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

import styles from './styles.css';

export class AboutPage extends React.Component {

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
          title="About Page"
          meta={[
            { name: 'description', content: 'About page of React.js Boilerplate application' },
          ]}
        />
        <H1>About</H1>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>Twitter API Integration</p>
            <p>Connect directly to the Twitter to retrieve data streams.</p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>React Redux Framework</p>
            <p>Get robust and predictable state management. Unidirectional data
            flow allows for change logging and time travel debugging.</p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>D3JS Data Visualization</p>
            <p>Use D3JS Libraries to Produce Dynamic Data Representations.</p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>Bleeding Edge JavaScript</p>
            <p>Template strings, object destructuring, arrow functions, JSX
            syntax Routers, webpack, and ES6!</p>
          </li>

        </ul>
        <Button handleRoute={this.openHomePage}>Home</Button>
      </div>
    );
  }
}
AboutPage.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(AboutPage);
