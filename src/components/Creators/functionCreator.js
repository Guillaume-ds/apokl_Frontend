import axios from "axios";

export async function fetchCreator(creatorName){
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
        "creator":creatorName
    }

    const url = "http://localhost:8000/api/creators/search-creators"

    const creatorReceived = await axios.post(url, body, config)

    return creatorReceived
}