type RowData = {
    id: string;
    incidentId: string;
    title: string;
    severity: string;
    status: string;
    service: string;
    assignedTo: string;
    created: string;
    updated: string;
    description: string;
};
export const fetchIncidents = async (): Promise<RowData[]> => {
    return [
        {
            id: "1",
            incidentId: "INC-001",
            title: "Server Down",
            severity: "High",
            status: "Open",
            service: "CRM",
            assignedTo: "John Doe",
            created: "2026-03-01 10:00",
            updated: "2026-03-01 10:30",
            description: "Primary server is not responding."
        },
        {
            id: "2",
            incidentId: "INC-002",
            title: "Database Connection Error",
            severity: "Medium",
            status: "Resolved",
            service: "Chat",
            assignedTo: "Alice Smith",
            created: "2026-03-02 09:15",
            updated: "2026-03-02 11:00",
            description: "Intermittent DB connection failures observed."
        },
        {
            id: "3",
            incidentId: "INC-003",
            title: "Email Delivery Failure",
            severity: "High",
            status: "Open",
            service: "Email",
            assignedTo: "Rahul Patil",
            created: "2026-03-03 08:45",
            updated: "2026-03-03 09:20",
            description: "Emails are not being sent to external domains."
        },
        {
            id: "4",
            incidentId: "INC-004",
            title: "High API Latency",
            severity: "Low",
            status: "Open",
            service: "CRM",
            assignedTo: "Priya Shah",
            created: "2026-03-04 11:00",
            updated: "2026-03-04 11:30",
            description: "API response times are slower than expected."
        },
        {
            id: "5",
            incidentId: "INC-005",
            title: "Memory Leak Detected",
            severity: "High",
            status: "Open",
            service: "Chat",
            assignedTo: "John Doe",
            created: "2026-03-05 14:10",
            updated: "2026-03-05 15:00",
            description: "Application memory usage increasing continuously."
        },
        {
            id: "6",
            incidentId: "INC-006",
            title: "Disk Space Warning",
            severity: "Medium",
            status: "Resolved",
            service: "Email",
            assignedTo: "Alice Smith",
            created: "2026-03-06 10:20",
            updated: "2026-03-06 12:00",
            description: "Disk space reached 90% utilization."
        },
        {
            id: "7",
            incidentId: "INC-007",
            title: "Authentication Failure",
            severity: "High",
            status: "Resolved",
            service: "CRM",
            assignedTo: "Rahul Patil",
            created: "2026-03-07 09:00",
            updated: "2026-03-07 10:30",
            description: "Users unable to login due to auth service issue."
        },
        {
            id: "8",
            incidentId: "INC-008",
            title: "Chat Messages Delayed",
            severity: "Low",
            status: "Open",
            service: "Chat",
            assignedTo: "Priya Shah",
            created: "2026-03-08 13:00",
            updated: "2026-03-08 13:45",
            description: "Messages are delayed by 5–10 seconds."
        },
        {
            id: "9",
            incidentId: "INC-009",
            title: "Queue Backlog",
            severity: "Medium",
            status: "Open",
            service: "Email",
            assignedTo: "John Doe",
            created: "2026-03-09 16:00",
            updated: "2026-03-09 16:30",
            description: "Email queue processing slower than expected."
        },
        {
            id: "10",
            incidentId: "INC-010",
            title: "CPU Spike",
            severity: "High",
            status: "Open",
            service: "CRM",
            assignedTo: "Alice Smith",
            created: "2026-03-10 12:00",
            updated: "2026-03-10 12:20",
            description: "Unexpected CPU spike observed on production server."
        },
        {
            id: "11",
            incidentId: "INC-011",
            title: "Search Not Working",
            severity: "Medium",
            status: "Resolved",
            service: "Chat",
            assignedTo: "Rahul Patil",
            created: "2026-03-11 10:00",
            updated: "2026-03-11 11:15",
            description: "Search feature returning no results."
        },
        {
            id: "12",
            incidentId: "INC-012",
            title: "File Upload Error",
            severity: "High",
            status: "Open",
            service: "Email",
            assignedTo: "Priya Shah",
            created: "2026-03-12 09:30",
            updated: "2026-03-12 10:10",
            description: "File uploads failing due to server error."
        },
        {
            id: "13",
            incidentId: "INC-013",
            title: "Notification Delay",
            severity: "Low",
            status: "Open",
            service: "CRM",
            assignedTo: "John Doe",
            created: "2026-03-13 14:00",
            updated: "2026-03-13 14:30",
            description: "Push notifications delayed."
        },
        {
            id: "14",
            incidentId: "INC-014",
            title: "Permission Denied Error",
            severity: "Medium",
            status: "Resolved",
            service: "Chat",
            assignedTo: "Alice Smith",
            created: "2026-03-14 11:45",
            updated: "2026-03-14 13:00",
            description: "Users facing permission issues on dashboard."
        },
        {
            id: "15",
            incidentId: "INC-015",
            title: "Backup Failed",
            severity: "High",
            status: "Open",
            service: "Email",
            assignedTo: "Rahul Patil",
            created: "2026-03-15 02:00",
            updated: "2026-03-15 02:30",
            description: "Nightly backup job failed."
        }
    ]
};