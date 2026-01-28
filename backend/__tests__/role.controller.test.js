import { it, jest } from '@jest/globals';

// Mock the Role model
jest.unstable_mockModule('../services/RoleService.js', () => ({
    findRoles: jest.fn(),
}));

// Import the controller AFTER mocking
const { getRoles } = await import('../controllers/RoleController.js');
const { findRoles } = await import('../services/RoleService.js');

describe('roles controller', () => {
    it('should return all roles with status 200 when successful', async () => {
        const mockRoles = [

            {
                name: "UI/UX Designer",
                focus: "Accessibility, Responsiveness, Design Thinking (No code)",
                questionCount: 5,
                __v: 0,
                createdAt: "2026-01-28T09:54:06.120Z",
                updatedAt: "2026-01-28T09:54:06.120Z"
            },
            {
                name: "Web Developer",
                focus: "Web fundamentals + Data Structures & Algorithms (DSA)",
                questionCount: 5,
                __v: 0,
                createdAt: "2026-01-28T09:54:06.121Z",
                updatedAt: "2026-01-28T09:54:06.121Z"
            }
        ];

        findRoles.mockResolvedValue(mockRoles);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getRoles(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRoles);
    });

    it('should return status 500 when service throws an error', async () => {
        findRoles.mockRejectedValue(new Error('Service error'));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await getRoles(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
})