"use client";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import Table from "@/components/Table";
import ServiceCard from "@/components/ServiceCard";
import { dashboardConfig } from "@/config/dashboardConfig";
import { fetchIncidents } from "@/lib/mockApiForIncidents";
import { RowData } from "@/types";
import SidePanel from "@/components/SidePanel";
import Filters from "@/components/Filters";
import { Typography } from "@mui/material";
import {
    fetchServices,
    ServiceRowData,
} from "@/lib/mockApiForServiceTab";
import EmptyState from "@/components/EmptyState";
import { getCurrentUserRole } from "@/lib/auth";
import { rolePermissions } from "@/config/roles";
export const DashBoardHome = () => {
    const [activeTab, setActiveTab] = useState<"services" | "incidents">(
        "services"
    );

    const [incidentData, setIncidentData] = useState<RowData[]>([]);
    const [serviceData, setServiceData] = useState<ServiceRowData[]>([]);
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

    const [severity, setSeverity] = useState<string>("High");
    const [status, setStatus] = useState<string>("Open");
    const role = (getCurrentUserRole() || "viewer").toLowerCase() as keyof typeof rolePermissions;
    const permissions = rolePermissions[role] || {
        canViewServices: false,
        canViewIncidents: false,
    };
    const safeActiveTab: "services" | "incidents" =
        activeTab === "incidents" && !permissions.canViewIncidents
            ? "services"
            : activeTab === "services" && !permissions.canViewServices
                ? "incidents"
                : activeTab;


    const handleTabChange = (tab: string) => {
        if (tab === "incidents" && !permissions.canViewIncidents) return;
        if (tab === "services" && !permissions.canViewServices) return;

        setActiveTab(tab as "services" | "incidents");
    };

    useEffect(() => {
        const loadData = async () => {
            if (safeActiveTab === "incidents") {
                const res = await fetchIncidents();
                setIncidentData(res);
            } else {
                const res = await fetchServices();
                setServiceData(res);
            }
        };

        loadData();
    }, [safeActiveTab]);

    const filteredIncidents = incidentData.filter((item) => {
        const matchSeverity = severity ? item.severity === severity : true;
        const matchStatus = status ? item.status === status : true;
        return matchSeverity && matchStatus;
    });

    const filteredTabs = dashboardConfig.tabs.filter((tab) => {
        if (tab.id === "incidents") return permissions.canViewIncidents;
        if (tab.id === "services") return permissions.canViewServices;
        return false;
    });

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex justify-between items-center">
                <Typography
                    variant="body2"
                    sx={{
                        backgroundColor: "#e3f2fd",
                        color: "#0d47a1",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        textTransform: "capitalize",
                        fontWeight: 500,
                        fontStyle: "italic",
                    }}
                >
                    Current role {role}
                </Typography>
            </div>
            <Tabs
                tabs={filteredTabs}
                activeTab={safeActiveTab}
                setActiveTab={handleTabChange}
            />
            {safeActiveTab === "incidents" && permissions.canViewIncidents && (
                <>
                    <Filters
                        severity={severity}
                        status={status}
                        setSeverity={setSeverity}
                        setStatus={setStatus}
                    />

                    {filteredIncidents.length === 0 ? (
                        <EmptyState
                            onClear={() => {
                                setSeverity("");
                                setStatus("");
                            }}
                        />
                    ) : (
                        <Table
                            columns={dashboardConfig.tables.incidents.columns}
                            data={filteredIncidents}
                            onRowClick={(row) => setSelectedRow(row)}
                        />
                    )}

                    <SidePanel
                        open={!!selectedRow}
                        onClose={() => setSelectedRow(null)}
                        data={selectedRow}
                    />
                </>
            )}
            {safeActiveTab === "services" && permissions.canViewServices && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {serviceData.map((item) => (
                        <ServiceCard key={item.id} data={item} />
                    ))}
                </div>
            )}
        </div>
    );
};
