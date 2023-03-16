import React, { useEffect, useState } from 'react';

import supabase from '../../services/supabaseClient';

const Countries = () => {
  console.log(0);

  const [data, setData] = useState<any>({});

  useEffect(() => {
    async function getData() {
      try {
        // setIsLoading(true);

        const response = await supabase.from('countries').select('*');

        console.log(response);

        setData(data);

        // setIsLoading(false);
      } catch (err) {
        console.log(err);
        // setIsLoading(false);
      }
    }

    getData();
  }, [data]);

  return (
    <div>
      <h1> COUNTRIES </h1>
    </div>
  );
};

export default Countries;
