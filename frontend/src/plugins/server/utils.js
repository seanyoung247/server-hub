
const server = "http://server.lan:8000/api/health";

export async function testServer() {
    const response = await fetch(server, {
        signal: AbortSignal.timeout(1000),
    });

    return response.json().then(json => json);

}
