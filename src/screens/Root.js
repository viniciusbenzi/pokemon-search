import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import ScreenPokemonSearch from './Search/List'
import ScreenPokemonFavorites from './Search/Favorites'

const ScreensRoot = () => (
  <BrowserRouter>
    <Switch>
    <Route
        exact
        path="/"
        render={() => {
            return (
              <Redirect to="/list" />
            )
        }}
      />
      <Route path="/list" component={ScreenPokemonSearch} />
      <Route path="/favorites" component={ScreenPokemonFavorites} />
    </Switch>
  </BrowserRouter>
);

export default ScreensRoot;