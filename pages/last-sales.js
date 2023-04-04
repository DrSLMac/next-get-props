import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const LastSalesPage = (props) => {
    const [sales,setSales] = useState(props.sales);

    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error, isLoading } = useSWR('https://nextjs-course-2e3ab-default-rtdb.firebaseio.com/sales.json', fetcher);

    useEffect(() => {
        if (data) {
            const transformedSales = [];
            for (const key in data) {
                    transformedSales.push({
                        id: key, 
                        username: data[key].username, 
                        volume: data[key].volume
                    })
                }
        setSales(transformedSales)
        }
    }, [data])

    if (error) return <p>Failed to Load</p>
    if (isLoading) return <div>Loading...</div>
    if (!data && !sales) return <p>No data or No sales to Display...</p>;
    
    return (
        <ul>
        {sales.map((sale) => (
            <li key={sale.id}>
                {sale.username} - ${sale.volume}
            </li>
        ))}
    </ul>
  );
}

export async function getStaticProps() {
    return fetch('https://nextjs-course-2e3ab-default-rtdb.firebaseio.com/sales.json')
    .then(response => response.json())
    .then(data => {
        const transformedSales = [];

        for (const key in data) {
            transformedSales.push({
                id: key,
                username: data[key].username,
                volume: data[key].volume,
            });
        }

        return { props: { sales: transformedSales } };
    });
}

export default LastSalesPage


// const [isLoading, setIsLoading] = useState(false);

 // useEffect(() => {
    //     setIsLoading(true);
    //     fetch('https://nextjs-course-2e3ab-default-rtdb.firebaseio.com/sales.json').then(response => response.json())
    //     .then(data => {
    //         const transformedSales = [];

    //         for (const key in data) {
    //             transformedSales.push({
    //                 id: key, 
    //                 username: data[key].username, 
    //                 volume: data[key].volume
    //             })
    //         }
    //         setSales(transformedSales)
    //         setIsLoading(false);
    //     })
    // }, []);