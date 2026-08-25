import { useState, useCallback } from 'react';

function useHttp() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = useCallback(async ({ url, method = 'GET', body = null, headers = {} }) => {
        setLoading(true);
        setError(null);

        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(url, options);
            console.log(response);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const responseData = await response.json();
            setData(responseData);
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return { sendRequest, data, error, loading };
}

export default useHttp;
