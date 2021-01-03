/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import GeneratingDataPage from './containers/GeneratingDataPage';
import HomePage from './containers/HomePage';
import PreviewPage from './containers/PreviewPage';
import SubmissionPage from './containers/SubmissionPage';

// Lazily load routes and code split with webpack
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.GENERATE_DATA} component={GeneratingDataPage} />
        <Route path={routes.PREVIEW} component={PreviewPage} />
        <Route path={routes.SUBMISSION} component={SubmissionPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
