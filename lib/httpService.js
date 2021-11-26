export class HttpService {
    globalHeaders;
    constructor(globalHeaders = {}) {
        this.globalHeaders = globalHeaders;
    }
    request(method, url, body = {}, headers = {}) {
        return fetch(url,{
            method,
            ...(method !== "GET" && {
                body: JSON.stringify(body)
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...this.globalHeaders,
                ...headers
            }
        }).then(data => {
            if(data.ok){
                return data.json();
            }
            throw data;
        })
    }

    get(url, headers = {}) {
        return this.request("GET", url, {}, headers)
    }

    post(url, body = {}, headers = {}) {
        return this.request("POST", url, body, headers)
    }

    put(url, body = {}, headers = {}) {
        return this.request("PUT", url, body, headers)
    }

    delete(url, headers = {}) {
        return this.request("DELETE", url, {}, headers)
    }

    updateClass(headers) {
        this.globalHeaders = headers;
    }

}