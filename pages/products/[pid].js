import { Fragment } from "react"
import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
    const { loadedProduct } = props;

    // 👇🏽 Use this conditional statement if fallback is set to true
    if (!loadedProduct) {
        return <p>Loading...</p>
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    return data
}

export async function getStaticProps(context) {
    // console.log("context: ", context)
    const { params } = context;

    const productId = params.pid;

    const data = await getData();

    const product = data.products.find(product => product.id === productId);

    // 👇🏽use this conditional if fallback is set to true to prevent an error when searching for a page that is not available - will trigger 404 page
    if (!product) {
        return { notFound: true }
    }

    return {
        props: {
            loadedProduct: product
        }
    };
}

export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map(product => product.id);
    const pathsWithParams = ids.map(id => ({ params: { pid: id } }))
    
    return {
        paths: pathsWithParams,
        fallback: true,
    };
}

export default ProductDetailPage