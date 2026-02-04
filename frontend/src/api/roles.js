export const fetchRoles = async () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${BASE_URL}/api/roles`);

    if (!response.ok) {
        throw new Error('Failed to fetch roles');
    }

    return response.json();
}