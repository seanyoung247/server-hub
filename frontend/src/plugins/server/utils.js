
const server = "http://server.lan:8000/api/health";

export async function getServerStatus() {
    try {
        const response = await fetch(server, {
            signal: AbortSignal.timeout(1000),
        });

        if (!response.ok) return null;

        return await response.json();
    }
    catch {
        return null;
    }
}

export function formatSize(bytes, unit) {
    const factors = {
        kb: 1024,
        mb: 1048576,
        gb: 1073741824,
        tb: 1099511627776,
    }
    return bytes / factors[unit];
}