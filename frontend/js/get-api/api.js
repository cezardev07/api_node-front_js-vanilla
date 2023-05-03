export const endPointApi = "http://localhost:3333/"

export const get = async () => {
    
    const response = await fetch(endPointApi)
    const data = await response.json()
    
    return data
}