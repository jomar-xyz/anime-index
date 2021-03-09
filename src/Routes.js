import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home/Home.js'
import AnimeInfo from './components/anime-info/AnimeInfo.js'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/anime/:slug" component={AnimeInfo} />
      </Switch>
    </BrowserRouter>
  )
}
