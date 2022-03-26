import { useState } from 'react';
export const useViewHook = (getData, url) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const view = async () => {
    setLoading(true);
    const data = await getData();
    const products = await data.json();
    console.log(products);
    setItems(products);
    setLoading(false);
  };

  return { items, loading, error, view };
};
