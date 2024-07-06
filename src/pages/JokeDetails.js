import {
    Route,
    useParams,
    useRouteMatch,
} from "react-router-dom/cjs/react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedJoke from "../components/jokes/HighlightedJoke";
import useHttp from "../hooks/use-http";
import { getJoke } from "../utils/firebase-api";
import { useEffect } from "react";
import Loader from "../components/UI/Loader";

const JokeDetails = () => {
    const routeMatch = useRouteMatch();
    const params = useParams();
    const {
        sendHttpRequest,
        status,
        data: joke,
        error,
    } = useHttp(getJoke, true);
    useEffect(() => {
        sendHttpRequest(params.jokeId);
    }, [sendHttpRequest, params.jokeId]);
    if (status === "pending") {
        return (
            <div className="centered">
                <Loader></Loader>
            </div>
        );
    }
    if (error) {
        return <p className="centered">{error}</p>;
    }
    if (!joke.text) {
        return <h1 className="centered">Joke not found</h1>;
    }

    return (
        <div>
            <HighlightedJoke
                topic={joke.topic}
                text={joke.text}
            ></HighlightedJoke>

            <Route path={`${routeMatch.path}/comment`}>
                <Comments></Comments>
            </Route>
        </div>
    );
};

export default JokeDetails;
