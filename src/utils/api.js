export const BASE_URL = "http://localhost:8080"

export const productsList = async () => {
    try {
        const res = await fetch(`${BASE_URL}/products`)
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error);        
    }
}

export const ProductDetail = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/products/id`)
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error);        
    }
}

export const categoriesList = async () => {
    try {
        const res = await fetch(`${BASE_URL}/category`)
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error);        
    }
}

export const getProductByCategory = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/category/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);        
    }
}

