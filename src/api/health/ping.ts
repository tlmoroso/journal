import { pingHealth as pingHealthServer, type HealthPingResponse } from "~/server/health/ping"

export async function pingHealth(): Promise<HealthPingResponse> {
    return pingHealthServer().then(data => {
        console.log(`Pinging Server: Status ${data.status} at ${new Date(data.timestamp).toISOString()}`)
        return data;
    }).catch(error => {
        console.error(`Error pinging server: ${error}`);
        throw error;
    });
}