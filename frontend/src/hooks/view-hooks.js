import { useState } from 'react';
export const useViewHook = (getData) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const view = async () => {
    setLoading(true);
    await getData().then((res) => {
      setItems(res.data);
      setLoading(false);
      console.log(res.data);
    });
  };

  return { items, loading, error, view };
};
