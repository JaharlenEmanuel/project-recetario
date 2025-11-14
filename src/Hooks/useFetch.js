import axios from "axios"
import { useEffect, useState } from "react"

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); // Cambié a false inicial
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        axios(url)
            .then((informacion) => {
                setData(informacion.data);
            })
            .catch((err) => {
                setError(err);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error }
}