class HTTP {

    constructor(header, body, method, url) {

        console.log(body);

        if (typeof header === "string" && header.length > 0)
        {
            header = JSON.parse(header);
        }
        else if (header === "")
        {
            header = undefined
        }
        this.requestHeader = header;

        if (typeof body === "string" && body.length > 0)
        {
            body = JSON.parse(body);
        }
        else if (body === "")
        {
            body = undefined
        }

        this.requestBody = body;
        console.log(this.requestBody)
        this.method = method;
        this.url = url;
        this.responseBody = "";
        this.responseHeader = "";
    }

    request = async () => {
        var err = undefined
        console.log(this.url)
        console.log(this.method)
        console.log(this.requestHeader)
        console.log(this.requestBody)
        try {
            const response = await fetch(this.url, {
                method: this.method,
                headers: this.requestHeader,
                body: JSON.stringify(this.requestBody),
            });

            if (!response.ok) {
                err = new Error(response.status + " (" + response.statusText + ")");
            }

            // Collect response header information
            var tmp = "";
            response.headers.forEach(
                function(val, key) { 
                    tmp = tmp.concat(key +': '+ val +'\n');
                }
            );
            this.responseHeader = tmp;

            // Collect response body information
            const contentType = response.headers.get("content-type");
            console.log(contentType);
            if (contentType && 
                (contentType.indexOf("application/json") !== -1 || contentType.indexOf("application/hal+json") !== -1)) {
                
                // process JSON
                const json = await response.json();
                this.responseBody = JSON.stringify(json);

            } else {

                // process Text/HTML/XML
                const text = await response.text();
                this.responseBody = text;
            }
            // if (err !== undefined)
            //     throw err;
        }
        catch (err) {
            console.log(err);
            throw new Error("Failed to send "+ this.method +" request to '"+ this.url +"'.");
        }
    }

}

export default HTTP;