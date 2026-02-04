import { renderWithClient } from "../utils";
import Roles from "../../pages/Roles";
import { fetchRoles } from "../../api/roles";
import { screen } from "@testing-library/dom";

vi.mock("../../api/roles", () => ({
    fetchRoles: vi.fn(),
}));

describe("Roles page", () => {
    it("shows loading state while fetching roles", () => {
        fetchRoles.mockImplementation(() => new Promise(() => { }));
        renderWithClient(<Roles />);
        expect(screen.getByText(/Loading roles.../i)).toBeInTheDocument();
    });

    it("shows error state when fetch fails", async () => {
        fetchRoles.mockRejectedValueOnce(new Error("Failed to fetch"));
        renderWithClient(<Roles />);
        expect(await screen.findByText(/Error loading roles:/i)).toBeInTheDocument();
    });

    it("renders roles when fetch succeeds", async () => {
        fetchRoles.mockResolvedValueOnce([
            { _id: "1", name: "Scrum Master", questionCount: 12 },
            { _id: "2", name: "UI Designer", questionCount: 8 },
        ]);

        renderWithClient(<Roles />);

        expect(await screen.findByText("Scrum Master")).toBeInTheDocument();
        expect(screen.getByText("12 questions available")).toBeInTheDocument();
        expect(screen.getByText("UI Designer")).toBeInTheDocument();
        expect(screen.getByText("8 questions available")).toBeInTheDocument();
    });
});
