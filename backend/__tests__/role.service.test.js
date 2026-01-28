import { describe, it, jest } from '@jest/globals';

// Mock the Role model
jest.unstable_mockModule(
    '../models/RoleModel.js',
    () => ({
        default: {
            find: jest.fn(),
        },
    })
);

// Import the service AFTER mocking
const { default: Role } = await import("../models/RoleModel.js");
const { findRoles } = await import('../services/RoleService.js');

describe('findRoles service', () => {

    it('should return all roles when successful', async () => {
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

        Role.find.mockResolvedValue(mockRoles);

        const roles = await findRoles();

        expect(Role.find).toHaveBeenCalledWith({});
        expect(roles).toEqual(mockRoles);
    });

    it('should return error when database fails', async () => {
        Role.find.mockRejectedValue(new Error('Database error'));

        await expect(findRoles()).rejects.toThrow('Database error');
    })
});