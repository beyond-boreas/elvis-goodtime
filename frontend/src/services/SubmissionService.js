import axios from 'axios'

// URL for submissions datastore
const baseUrl = 'http://localhost:3001/api/submissions'

const getAll = () => {
    // Send a get request to the baseUrl and store its response
    const request = axios.get(baseUrl)
    // Return the data portion of the request
    return request.then(response => response.data)
}

const create = newObject => {
    // Send a post request to replace the object with a new object
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
  
// Replace an individual note object with a new object
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }
