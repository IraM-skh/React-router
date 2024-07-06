import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";

import Layout from "./components/layout/Layout";
import Jokes from "./pages/Jokes";
import JokeDetails from "./pages/JokeDetails";
import AddJoke from "./pages/AddJoke";
import NotFound from "./pages/NotFound";
function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/jokes" />
                </Route>
                <Route path="/jokes" exact>
                    <Jokes></Jokes>
                </Route>
                <Route path="/jokes/:jokeId">
                    <JokeDetails></JokeDetails>
                </Route>
                <Route path="/add-joke">
                    <AddJoke></AddJoke>
                </Route>
                <Route path="*">
                    <NotFound></NotFound>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
