export async function getPuppies() {
    
    try {
        const response = await fetch('http://127.0.0.1:8000/api/puppies');

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }

        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
    }
}