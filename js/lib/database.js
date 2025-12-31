export const DB_URL = "https://ceziroom-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function dbSave(path, data) {
    return fetch(`${DB_URL}${path}.json`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}
