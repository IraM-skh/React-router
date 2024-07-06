import { Fragment, useEffect } from "react";
import JokeList from "../components/jokes/JokeList";
import useHttp from "../hooks/use-http";
import { getJokes } from "../utils/firebase-api";
import Loader from "../components/UI/Loader";
import NoJokesFound from "../components/jokes/NoJokesFound";

const Jokes = () => {
    const {
        sendHttpRequest,
        status,
        data: loadedJokes,
        error,
    } = useHttp(getJokes, true);
    useEffect(() => {
        sendHttpRequest();
    }, [sendHttpRequest]);

    if (status === "pending") {
        return (
            <div className="centered">
                <Loader></Loader>
            </div>
        );
    }
    if (error) {
        return <p className="centered focused">{error}</p>;
    }

    if (status === "completed" && (!loadedJokes || loadedJokes.length === 0)) {
        return <NoJokesFound></NoJokesFound>;
    }
    return (
        <Fragment>
            <h1>Jokes page</h1>
            <JokeList jokes={loadedJokes}></JokeList>
        </Fragment>
    );
};

export default Jokes;
