import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore';
import App from './App';
import {ConnectedRouter as Router} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import '../styles/index.css';
import 'react-md/src/scss/_react-md.scss';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons']
  }
});

const history = createHistory();
const store = configureStore(history);

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  }
}

export default Root;

