import axios from "axios";

export async function fetchCollection(creator,collectionslug){
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
        "creator":creator,
        "slug":collectionslug
    }
        const collectionsReceived = await axios.post("http://localhost:8000/api/creators/search-collections", body, config )
        return collectionsReceived.data.results[0]
        
  	
}