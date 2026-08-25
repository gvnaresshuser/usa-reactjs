import { useState, useEffect, useCallback } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch data (memoized with useCallback)
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const json = await response.json();
            setData(json);
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();//running or calling fetchData function
    }, [fetchData]);//IMPORTANT: useCallback ensures fetchData is stable and doesn't change on every render
    //But if url changes, it will refetch data
    //refetch is alias name for fetchData function

    return { data, loading, error, refetch: fetchData };
}

export default useFetch;
