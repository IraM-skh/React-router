import { Fragment } from "react";
import JokeForm from "../components/jokes/JokeForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useHttp from "../hooks/use-http";
import { addJoke } from "../utils/firebase-api";
import { useEffect } from "react";
const AddJoke = () => {
    const history = useHistory();
    const { sendHttpRequest, status } = useHttp(addJoke);

    useEffect(() => {
        if (status === "completed") {
            history.push("/jokes");
        }
    }, [status, history]);
    const AddJokeHandler = (jokeInfoObj) => {
        sendHttpRequest(jokeInfoObj);
        //{ topic: enteredTopic, text: enteredText }
    };
    const isLoading = status === "pending";
    return (
        <Fragment>
            <h1>Add joke page</h1>
            <JokeForm
                onAddJoke={AddJokeHandler}
                isLoading={isLoading}
            ></JokeForm>
        </Fragment>
    );
};

export default AddJoke;
