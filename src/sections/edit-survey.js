import React, {useEffect, useState} from "react";
import helpers from "../helpers";
import {Link, useParams, useHistory} from 'react-router-dom';
import context from "react-router/modules/RouterContext";


export default function EditSurvey() {
    let {id} = useParams();
    const [surveyData, setSurveyData] = useState(null);
    const [editorState, setEditorState] = useState(true);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        const data = await helpers.apiFetch('/questions', 'POST', {surveyId: id});
        if (data.response) {
            history.push(`/survey/${id}/question/${data.response._id}`);
        }
        setLoading(false);
    }

    const handleDelete = (questionId, index) => {
        (async () => {
            await helpers.apiFetch(`/questions/${questionId}`, 'DELETE', {});
            const currentSurveyQuestionData = [...surveyData.questions];
            currentSurveyQuestionData.splice(index, 1);
            setSurveyData({survey: surveyData.survey, questions: currentSurveyQuestionData});
            setLoading(false);
            alert('Question Deleted!');
        })()
    }
    useEffect(() => {
        (async () => {
            const data = await helpers.apiFetch(`/surveys/${id}`, 'GET');
            setSurveyData(data.response);
            setLoading(false);
        })();
    }, []);

        return (
            <section>
                {loading && (
                    <div className='loader'>
                        Loading...
                    </div>
                )}

                <h1>
                    Questions for Survey: {surveyData && surveyData.survey.title}
                </h1>

                <h3>
                    Survey Token: {surveyData && surveyData.survey.token}
                </h3>
                Please Click <a href='/' onClick={handleAddQuestion}>here</a> to add a new question
                <table>
                    <thead>
                    <tr>
                        <th>
                            Question Title
                        </th>
                        <th>
                            Action
                        </th>
                        <th>
                            Authored By
                        </th>
                        <th>
                            Last Updated At
                        </th>
                    </tr>
                    </thead>

                    <tbody>

                    {
                        surveyData &&  (surveyData.questions.map((question, index) => (
                            <tr key={question._id}>
                                <td dangerouslySetInnerHTML={{__html: question.content}}>
                                </td>
                                <td>
                                    <Link to={`/survey/${id}/question/${question._id}`}>
                                        <div>
                                            Edit
                                        </div>
                                    </Link>
                                    <Link onClick={(e) => {
                                        handleDelete(question._id, index)
                                    }}>
                                        Delete
                                    </Link>
                                </td>
                                <td>
                                    {question.author}
                                </td>
                                <td>
                                    {
                                        new Date(question.lastUpdated * 1000).toLocaleString()                                    }
                                </td>
                            </tr>)
                        ))
                    }

                    </tbody>
                </table>
            </section>
        )

}
