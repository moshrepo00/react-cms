import React, {useState} from "react";
import helpers from '../helpers'
import { useHistory, Link } from "react-router-dom";


export default function CreateSurvey() {
    const history = useHistory();
    const [params, setParams] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('debugging event! ', event.target[0].value);
        setParams(event.target[0].value);
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="title"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </main>
    );
}
