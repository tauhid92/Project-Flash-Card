import React from "react";
import { Route, Switch } from "react-router";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../home/Home";
import Study from "../study/Study";
import CreateDeck from "../deck/CreateDeck";
import Deck from "../deck/Deck";
import EditDeck from "../deck/EditDeck";
import AddCard from "../card/AddCard";
import EditCard from "../card/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path='/'>
            <Home />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study/>
          </Route>
          <Route path="/decks/new">
            <CreateDeck/>
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <Deck/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
