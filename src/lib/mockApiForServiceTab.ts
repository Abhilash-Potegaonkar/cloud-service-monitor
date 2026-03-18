export type ServiceRowData = {
    id: string;
    service: string;
    status: string;
    uptime: number;
    incidents: number;
};

export const fetchServices = async (): Promise<ServiceRowData[]> => {
    return [
        {
            id: "svc-1",
            service: "Email",
            status: "Healthy",
            uptime: 99.98,
            incidents: 2
        },
        {
            id: "svc-2",
            service: "Drive",
            status: "Degraded",
            uptime: 97.45,
            incidents: 5
        },
        {
            id: "svc-3",
            service: "CRM",
            status: "Down",
            uptime: 89.12,
            incidents: 12
        },
        {
            id: "svc-4",
            service: "Chat",
            status: "Healthy",
            uptime: 99.99,
            incidents: 0
        },
        {
            id: "svc-5",
            service: "Email",
            status: "Degraded",
            uptime: 96.75,
            incidents: 4
        },
        {
            id: "svc-6",
            service: "Drive",
            status: "Healthy",
            uptime: 99.50,
            incidents: 1
        },
        {
            id: "svc-7",
            service: "CRM",
            status: "Healthy",
            uptime: 98.90,
            incidents: 3
        },
        {
            id: "svc-8",
            service: "Chat",
            status: "Down",
            uptime: 85.30,
            incidents: 10
        },
        {
            id: "svc-9",
            service: "Email",
            status: "Healthy",
            uptime: 99.70,
            incidents: 0
        },
        {
            id: "svc-10",
            service: "Drive",
            status: "Degraded",
            uptime: 95.10,
            incidents: 6
        }
    ];
};