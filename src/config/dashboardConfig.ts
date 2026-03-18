import { Column } from "@/types";

type Tab = {
    id: string;
    label: string;
};

export const dashboardConfig = {
    tabs: [
        { id: "services", label: "Services" },
        { id: "incidents", label: "Incidents" }
    ],

    tables: {
        incidents: {
            columns: [
                { id: "title", label: "Title", type: "text" },
                { id: "severity", label: "Severity", type: "badge" },
                { id: "status", label: "Status", type: "chip" }
            ]
        }
    }
} satisfies {
    tabs: Tab[];
    tables: {
        incidents: {
            columns: Column[];
        };
    };
};