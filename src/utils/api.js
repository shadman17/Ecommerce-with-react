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
        const res = await fetch(`${BASE_URL}/products/${id}`)
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

export const addCart = async (id, user) => {
                    
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `bearer ${user.userInfo.token}` },
        body: JSON.stringify({
            product: {
                id: id,
                quantity: 1
            }
        }),
    };

    await fetch(`${BASE_URL}/cart`, requestOptions)
    // .then(res=>res.json())
    // .then(res=>console.log(res));
}

export const removeCart = async (id, user) => {
                    
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `bearer ${user.userInfo.token}` },
        body: JSON.stringify({
            product: {
                id: id,
                quantity: 0
            }
        }),
    };

    await fetch(`${BASE_URL}/cart`, requestOptions)
    // .then(res=>res.json())
    // .then(res=>console.log(res));
}

export const getCart = async (user) => {

    try{
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `bearer ${user.userInfo.token}` },
    
        }
                        
        const response = await fetch(`${BASE_URL}/cart`, requestOptions)
        const data = await response.json()
        return data
    }
    catch(e){
        console.log(e);  
    }

    
}

export const getUserDetails = async (user) => {
    try{
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `bearer ${user.userInfo.token}` },
    
        }
                        
        const response = await fetch(`${BASE_URL}/my-detail`, requestOptions)
        const data = await response.json()
        return data
    }
    catch(e){
        console.log(e);  
    }
}

export const setUserDetails = async (user) => {
    try{
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `bearer ${user.userInfo.token}` },
    
        }
                        
        const response = await fetch(`${BASE_URL}/my-detail`, requestOptions)
        const data = await response.json()
        return data
    }
    catch(e){
        console.log(e);  
    }
}

export const checkout = async (user) =>{
    try {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `bearer ${user.userInfo.token}` },
    
        }
        const res = await fetch(`${BASE_URL}/order/checkout`, requestOptions)
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error);        
    }
}