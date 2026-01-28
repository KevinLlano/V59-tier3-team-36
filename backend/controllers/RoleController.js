import { findRoles } from "../services/RoleService.js";

export const getRoles = async (req, res) => {
    try {
        // call service layer
        const roles = await findRoles();
        res.status(200).json(roles);
    } catch (error) {
        console.log(`Error in getting roles: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};