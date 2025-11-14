import { useState, useEffect } from "react";

export function useFetchMeals(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay endpoint, no hacer fetch
    if (!endpoint) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(endpoint);

        if (!res.ok) throw new Error("Error en la petición");

        const json = await res.json();
        setData(json || []);
      } catch (err) {
        setError(err.message || "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

