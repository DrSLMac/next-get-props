import React, { useEffect } from 'react'

const LastSalesPage = () => {
    useEffect(() => {
        fetch('https://next-props-default-rtdb.firebaseio.com/sales/json');
    }, []);

  return (
    <ul></ul>
  )
}

export default LastSalesPage