import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";

import JokeItem from "./JokeItem";
import styles from "./JokeList.module.css";

const sortJokes = (jokes, isAscending) => {
    return jokes.sort((joke1, joke2) => {
        if (isAscending) {
            return joke1.id > joke2.id ? 1 : -1;
        } else {
            return joke1.id < joke2.id ? 1 : -1;
        }
    });
};

const JokeList = (props) => {
    const location = useLocation();
    const history = useHistory();

    const searchParams = new URLSearchParams(location.search);
    const sortingOrder = searchParams.get("sort");
    const isSortingAscending = sortingOrder === "asc";
    sortJokes(props.jokes, isSortingAscending);

    const toggleSortingHandler = () => {
        history.push("/jokes?sort=" + (isSortingAscending ? "desc" : "asc"));
    };
    return (
        <Fragment>
            <div className={styles.filter}>
                <button onClick={toggleSortingHandler}>
                    Sort Jokes {isSortingAscending ? "descending" : "ascending"}
                </button>
            </div>
            <ul className={styles.list}>
                {props.jokes.map((joke) => (
                    <JokeItem
                        key={joke.id}
                        id={joke.id}
                        topic={joke.topic}
                        text={joke.text}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default JokeList;
