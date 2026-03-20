export type Role = "admin" | "operator" | "viewer";

export const rolePermissions = {
    admin: {
        canViewServices: true,
        canViewIncidents: true,
    },
    operator: {
        canViewServices: true,
        canViewIncidents: true,
    },
    viewer: {
        canViewServices: true,
        canViewIncidents: false,
    },
};