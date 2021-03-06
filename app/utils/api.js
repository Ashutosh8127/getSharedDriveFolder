let apiToken = null;
const url = 'https://www.googleapis.com/drive/v3/';
const childrenUrl = 'https://www.googleapis.com/drive/v2/';

export var api = {
    //set the user api token
    setApiToken(token) {
        apiToken = token
    },
    //get method heder setup
    configureGetOptions() {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${apiToken}`)
        return {
            method: 'GET',
            headers,
        }
    },
    //for user error handling
    parseAndHandleErrors(response) {
        if (response.ok) {
            return response.json()
        }
        return response.json()
            .then((error) => {
                throw new Error(JSON.stringify(error))
            })
    },
    getFile(id) {
        const options = this.configureGetOptions()
        return fetch(`${url}files/${encodeURIComponent(id)}`, options)
            .then(this.parseAndHandleErrors)
            .then((body) => {
                return body
            })
    },
    getChildFolder(id) {
        const options = this.configureGetOptions()
        return fetch(`${childrenUrl}files/${encodeURIComponent(id)}/children`, options)
            .then(this.parseAndHandleErrors)
            .then((body) => {
                return body.items;
            })
    }
}