import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR('https://next-props-default-rtdb.firebaseio.com/Sales.json', (url) => fetch(url).then(res => res.json()));

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key, 
          username: data[key].username, 
          volume: data[key].value
        });
      }
      console.log("transformedSales: ", transformedSales)
      setSales(transformedSales)
    }
  }, [data])

    // useEffect(() => {
    //   setIsLoading(true);
    //     fetch('https://next-props-default-rtdb.firebaseio.com/Sales.json')
    //     .then((response) => response.json())
    //     .then(data => {
    //       const transformedSales = [];

    //       for (const key in data) {
    //         transformedSales.push({
    //           id: key, 
    //           username: data[key].username, 
    //           volume: data[key].value
    //         });
    //       }
    //       console.log("transformedSales: ", transformedSales)
    //       setSales(transformedSales)
    //       console.log("sales: ", sales)
    //       setIsLoading(false)
    //     });
    // }, []);

    if (error) {
      return <p>Failed to load..</p>
    }

    if (!data && !sales) {
      return <p>Loading...</p>;
    }

  return (
    <ul>
      {sales.map(sale => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>))}
    </ul>
  )
}

//using getStaticProps to pre-generate it during the build process and possibly revalidate after deployment with the revalidate key
export async function getStaticProps() {
  return fetch('https://next-props-default-rtdb.firebaseio.com/Sales.json')
    .then((response) => response.json())
    .then(data => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key, 
          username: data[key].username, 
          volume: data[key].value
        });
      }
      return { props: { sales: transformedSales }, revalidate: 10 };
  });
}

//the above code could also be written with an await expression:
// export async function getStaticProps() {
//   const response = await fetch('https://next-props-default-rtdb.firebaseio.com/Sales.json');
//   const data = await response.json();
//   const transformedSales = [];

//   for (const key in data) {
//     transformedSales.push({
//       id: key,
//       username: data[key].username, 
//       volume: data[key].volume,
//     });
//   }

//   return { props: { sales: transformedSales }, revalidate: 10 }
// }

export default LastSalesPage