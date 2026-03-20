import { Role } from "@/config/roles";

export const getCurrentUserRole = (): Role => {
    if (typeof window !== "undefined") {
        const role = localStorage.getItem("role");

        if (role === "admin" || role === "operator" || role === "viewer") {
            return role;
        }
    }
    return "viewer";
};