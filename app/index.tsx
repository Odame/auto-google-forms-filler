import React, { Fragment } from 'react';
import electron from 'electron';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { setupFrontendListener } from 'eiphop';
import { history, configuredStore } from './store';
import './app.global.css';

// configure eiphop to listen to ipc responses
setupFrontendListener(electron);

const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
});
