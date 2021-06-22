import React, {useState, useEffect} from "react";
import helpers from "../helpers";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Link, useParams, useHistory} from 'react-router-dom';


export default function Question() {
    let {id, sid} = useParams();
    const history = useHistory();


    const [value, setValue] = useState('');
    const [options, setOptions] = useState(['']);
    const [category, setCategory] = useState('');
    const [scale, setScale] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log('debugging data! ', value);
        (async () => {
            const data = await helpers.apiFetch(`/questions/${id}`, 'GET');
            const response = data.response;
            if (response.content) {
                setValue(data.response.content);
            }
            if (response.author) {
                setAuthorName(data.response.author);
            }
            if (response.category) {
                setCategory(data.response.category);
            }

            if (response.options) {
                setOptions(data.response.options);
            }
            setLoading(false);
        })()
    }, []);


    const submitQuestion = (e) => {
        (async () => {
            const body = {
                content: value, category, scale, author: authorName, options
            }
            const response = await helpers.apiFetch(`/questions/${id}`, 'PUT', body);
            alert('Your Question has been saved!');
            history.push(`/survey/${sid}`)

        })()
    };

    const handleInputChange = (e, index) => {
        if (e) {
            const currentOptions = [...options];
            currentOptions[index] = e.target.value;
            setOptions(currentOptions);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    };

    const handleInputScaleChange = (e) => {
        setScale(e.target.value);
    }

    const handleAuthorNameChange = (e) => {
        setAuthorName(e.target.value);
    }
    const deleteOption = (index) => {
        const currentOptions = [...options];
        currentOptions.splice(index, 1);
        setOptions(currentOptions);
    }
    const addChoice = () => {
        const arr = [...options];
        arr.push('');
        setOptions(arr);
    };

    const debug = () => {
        console.log(options);
    };
    if (loading) {
        return (
            <div className='loader'>
                Loading...
            </div>
        )
    } else {
        return (
            <main className='question-container'>
                <h1>
                    Edit Question
                </h1>
                <h3>
                    Enter the title of your question here:
                </h3>
                <ReactQuill theme="snow" value={value} onChange={setValue} style={{minHeight: '100px'}}
                />

                <div className="category-container">
                    <label htmlFor="category">Choose a category:</label>

                </div>

                <select name="category" id="category" value={category} onChange={(e) => handleCategoryChange(e)}>
                    <option value="textbox">Textbox</option>
                    <option value="multiple-choice">Mutliple Choice</option>
                    <option value="scale">Scale</option>
                </select>

                {category === 'multiple-choice' && (
                    <div className="category-container">
                        {options.map((item, index) => (
                            <div key={index}>
                                <input type="text" value={item} onChange={(e) => handleInputChange(e, index)}/>
                                <button onClick={(e) => deleteOption(index)}>Delete</button>
                            </div>
                        ))}
                        <button onClick={addChoice}>
                            Add Multiple Choice Option
                        </button>
                    </div>

                )}

                {category === 'scale' && (
                    <input type="number" value={scale} onChange={(e) => handleInputScaleChange(e)}/>)
                }

                <div className="category-container">
                    <label htmlFor="author">
                        Your Name:
                    </label>
                    <input id="author" type="text" value={authorName} onChange={(e) => handleAuthorNameChange(e)}/>
                </div>

                <div>
                    <button onClick={submitQuestion}>Click Here To Question</button>
                </div>


            </main>
        );
    }
}
