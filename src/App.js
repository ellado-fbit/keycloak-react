import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import './App.css'
import { Welcome, Secured } from './components'

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <div>
            <Link to="/">Welcome</Link>
          </div>
          <div>
            <Link to="/secured">Secured</Link>
          </div>
        </nav>
        <Switch>
          <Route path="/" exact>
            <Welcome />
          </Route>
          <Route path="/secured">
            <Secured />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}
