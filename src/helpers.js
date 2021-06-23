const helpers = {
    apiFetch: async (endpoint, method, body = null) => {
        try {
            const url = `https://cms-backend.moweb.info/survey` + endpoint;
            const fetchObj = {
                method,
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
            };
            if (body) {
                fetchObj['body'] = JSON.stringify(body);
            }
            const response = await fetch(url, fetchObj);
            const data = await response.json();
            console.log('debugging response! ', data.data);
            return {message: 'success', response: data.data}

        } catch (e) {
            console.log('error!!! ', e);
        }
    }
}

export default helpers;
