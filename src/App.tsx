import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./components/Home'));
const CountryInfo = lazy(() => import('./components/CountryInfo'));

const App: React.FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<p>Loading...</p>}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/country/:name" component={CountryInfo}/>
        </Switch>
      </Router>
      </Suspense>
    </div>
  );
}

export default App;
