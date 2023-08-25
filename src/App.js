import "./App.css";
import { Route } from "react-router-dom";
import { Fragment } from "react";
import HomePage from "./pages/HomePage";
import MyProfile from "./pages/MyProfile";
import JournalistPage from "./pages/JournalistPage";
import AddJournalist from "./pages/AddJournalist";
import RemoveJournalist from "./pages/RemoveJournalist";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SearchResults from "./pages/SearchResults";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFoundImg from "./assets/undraw_page_not_found_su7k.jpg";
import { Switch } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/myprofile" exact>
          <MyProfile />
        </Route>
        <Route path="/journalist">
          {/*need to make dynamic*/}
          <JournalistPage />
        </Route>
        <Route path="/addjournalist">
          <AddJournalist />
        </Route>
        <Route path="/removejournalist">
          <RemoveJournalist />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/searchresults" exact>
          {/*need to make dynamic*/}
          <SearchResults />
        </Route>
        <Route path="*">
          <img src={PageNotFoundImg} width="100%" margin="0" height="100%" alt="404 error"/>
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
}
export default App;
