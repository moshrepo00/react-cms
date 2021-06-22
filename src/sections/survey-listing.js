import React, {useEffect, useState} from "react";
import helpers from "../helpers";
import {Link} from 'react-router-dom';


export default function SurveyListing() {
    const [surveys, setSurveys] = useState([]);
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await helpers.apiFetch('/surveys', 'GET');
            if (data) {
                setSurveys(data.response);
                setLoading(false);
            }
        })();
    }, []);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        setTitle(event.target[0].value);
        setName(event.target[1].value);
        const currentSurveyArr = [...surveys];
        const data = await helpers.apiFetch('/survey', 'POST', {title: event.target[0].value, author: event.target[1].value});
        currentSurveyArr.push(data.response);
        setSurveys(currentSurveyArr);
        setLoading(false);
        setTitle('');
        setName('');
        alert('Your survey has successfully been saved! ');

    };

    const handleDelete = async (e, surveyId, index) => {
        e.preventDefault();
        setLoading(true);
        await helpers.apiFetch(`/surveys/${surveyId}`, 'DELETE', {});
        const currentSurveyArr = [...surveys];
        currentSurveyArr.splice(index, 1);
        setSurveys(currentSurveyArr);
        setLoading(false);
        alert('Your survey has successfully been deleted! ');
    }

    return (
        <section>
            {loading && (
                <div className='loader'>
                    Loading...
                </div>
            )
            }

            <h1>
                Welcome to the Admin Section!
            </h1>
            <form className='new-survey' onSubmit={handleSubmit}>
                <label>
                    Add a new survey here:
                </label>
                <div>
                    <label htmlFor="title">
                        Survey Title
                    </label>
                    <div>
                        <input type="text" name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                    </div>
                    <label htmlFor="name" >
                        Your Name
                    </label>
                    <div>
                        <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                </div>


                <input type="submit" value="Submit"/>
            </form>

            <h3>
                Existing Surveys
            </h3>

            <table>
                <thead>
                <tr>
                    <th>
                        Survey Title
                    </th>
                    <th>
                        Survey Token ID
                    </th>
                    <th>
                        Action
                    </th>
                    <th>
                        Authored By
                    </th>
                    <th>
                        Created At
                    </th>
                </tr>
                </thead>

                <tbody>

                {
                    surveys && surveys.map((survey, index) => (
                        <tr className="survey" key={index}>
                            <td>
                                {survey.title}
                            </td>
                            <td>
                                {survey.token}
                            </td>
                            <td>
                                <Link to={`/survey/${survey._id}`}>
                                    <div>
                                        Edit
                                    </div>
                                </Link>
                                <a href='/' onClick={(e) => handleDelete(e, survey._id, index)}>
                                    Delete
                                </a>
                            </td>
                            <td>
                                {survey.author}
                            </td>
                            <td>
                                {new Date(survey.created * 1000).toLocaleString()}
                            </td>
                        </tr>
                    ))
                }

                </tbody>
            </table>
        </section>
    );
}
