export const fetchRoles = async () => {
    const response = await fetch('/api/roles');

    if (!response.ok) {
        throw new Error('Failed to fetch roles');
    }

    return response.json();
}