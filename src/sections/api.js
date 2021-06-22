
import React, { useState, useEffect } from 'react';

export default function useApi(url, body, method) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);



    useEffect(async () => {
        try {
            const url = `http://localhost:4100` + '/questions';
            const response = await fetch(url, {
                method: method,
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(body)
            });
            console.log('in here!!!! ', JSON.stringify(data));
            return {message: 'success'}

        } catch (e) {
            console.log('error!!! ', e);
        }
    }, [])

    return { data, isPending, error };
}

