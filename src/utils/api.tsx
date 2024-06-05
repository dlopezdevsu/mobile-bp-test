const API_URL = 'http://localhost:3002';

interface ProductInfo {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

interface ApiGetProductsResponseProps {
    data: ProductInfo[]
}

interface ApiProps {
    getProducts: () => Promise<ApiGetProductsResponseProps>;
}

const Api = {
    getProducts: () => fetch(`${API_URL}/bp/products`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }),
    postProduct: (body: ProductInfo) => fetch(`${API_URL}/bp/products`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        mode: 'same-origin',
    }),
    putProduct: (body: ProductInfo) => fetch(`${API_URL}/bp/products/${body.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        mode: 'same-origin',
    }),
    deleteProduct: (id: string) => fetch(`${API_URL}/bp/products/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    }),
    confirmIdProduct: (id: string) => fetch(`${API_URL}/bp/products/verification/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }),
}

export default Api;