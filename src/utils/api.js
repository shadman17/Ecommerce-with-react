const BASE_URL = "http://localhost:8080"

export const productsList = async () => {
    try {
        const res = await fetch(`${BASE_URL}/products`)
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error);        
    }
}

