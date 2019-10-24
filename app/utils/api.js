let apiToken = null;
const url = 'https://www.googleapis.com/drive/v3/';

export var api = {
    queryParams() {
        return encodeURIComponent("1QHiLM0oX9c4vW-DpAeJ2tEaW9q7FPDvp")
    },
    setApiToken(token) {
        apiToken = token
    },
    configureGetOptions() {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${apiToken}`)
        return {
            method: 'GET',
            headers,
        }
    },
    parseAndHandleErrors(response) {
        console.log(response)
        if (response.ok) {
            return response.json()
        }
        return response.json()
            .then((error) => {
                throw new Error(JSON.stringify(error))
            })
    },
    getFile() {
        const qParams = this.queryParams()
        const options = this.configureGetOptions()
        return fetch(`${url}files/${qParams}`, options)
            .then(this.parseAndHandleErrors)
            .then((body) => {
                console.log(body)
                if (body && body.files && body.files.length > 0) return body.files[0]
                return null
            })
    },
    getChildFolder() {
        const qParams = this.queryParams()
        const options = this.configureGetOptions()
        return fetch(`${url}files/${qParams}/children`, options)
            .then(this.parseAndHandleErrors)
            .then((body) => {
                console.log(body)
                if (body && body.files && body.files.length > 0) return body.files[0]
                return null
            })
    }
}