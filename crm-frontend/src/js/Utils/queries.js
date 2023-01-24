export async function getClients() {
    const response = await fetch('http://localhost:3000/api/clients');
    if (response.status >= 300) {
        return response.status;
    }
    return await response.json();
}


export async function createClient(client) {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(client)
    })
    if (response.status >= 300) {
        throw new Error(response.statusText);
    }
}

export async function getClientByID(id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`);
    return await response.json();
}

export async function changeClient(id, client) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(client)
    })
    if (response.status >= 300) {
        throw new Error(response.statusText);
    }
}

export async function deleteClient(id) {
    await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE',
    })
}
