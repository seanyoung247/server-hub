
const server = "/api/health";

export async function testServer() {
    const response = await fetch(server, {
        signal: AbortSignal.timeout(1000),
    });
    if (response.ok) {
        response.json().then(json => console.log(json));
        return "Connected";
    } else {
        return "Couldn't connect";
    }
}
