const { Client } = require('pg');

async function testConnection() {
    const sockets = ['/tmp', '/var/run/postgresql', ''];
    let success = false;
    for (const host of sockets) {
        console.log(`Trying host: '${host}'`);
        const client = new Client({
            user: 'postgres',
            database: 'postgres',
            host: host !== '' ? host : undefined,
        });
        try {
            await client.connect();
            console.log(`[SUCCESS] Connected using unix socket at ${host}`);
            success = true;
            await client.end();
            return;
        } catch (err) {
            console.log(`[FAIL] host: ${host} - ${err.message}`);
        }
    }
}

testConnection();
