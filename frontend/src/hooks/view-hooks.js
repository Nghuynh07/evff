import { useState, useCallback } from 'react';
export const useViewHook = (getData) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const view = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      getData()
        .then((res) => {
          setLoading(false);
          setItems(res.data.data);
          setError('');
        })
        .catch((err) => {
          setLoading(true);
          setError('Something went wrong. Please try again...');
        });
    }, 500);
  }, [getData]);

  return { items, loading, error, view };
};
