class HTTP
{
    constructor(header, body, method, url)
    {
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
        this.method = method;
        this.url = url;
        this.responseBody = "";
        this.responseHeader = "";
    }

    setScore = (s) =>
    {
        this.responseBody = {score: s};
    }

    request = async () =>
    {
        //var err = undefined
        console.log(this.url)
        console.log(this.method)
        console.log(this.requestHeader)
        console.log(this.requestBody)
        
        try
        {
            const response = await fetch("http://localhost:5000/", {
                method: this.method,
                headers: this.requestHeader,
                body: JSON.stringify(this.requestBody),
            });

            console.log(response);

            if (!response.ok)
            {
                console.log("ERROR -- Response not OK");
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
            if (contentType && 
                (contentType.indexOf("application/json") !== -1 || contentType.indexOf("application/hal+json") !== -1)) {
                
                // process JSON to an Object for easy access to fields
                const json = await response.json();
                this.responseBody = JSON.stringify(json);
                this.responseBody = JSON.parse(this.responseBody);

            } else {
                // process Text/HTML/XML
                const text = await response.text();
                this.responseBody = text;
            }
        }
        catch (err) {
            throw new Error("Failed to send "+ this.method +" request to '"+ this.url +"'."+err);
        }
    }

}

export default HTTP;