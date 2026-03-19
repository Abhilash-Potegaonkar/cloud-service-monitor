"use client";

import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import Table from "@/components/Table";
import ServiceCard from "@/components/ServiceCard";
import { dashboardConfig } from "@/config/dashboardConfig";
import { fetchIncidents } from "@/lib/mockApi";

import { RowData } from "@/types";

import SidePanel from "@/components/SidePanel";
import Filters from "@/components/Filters";
import {fetchServices, ServiceRowData} from "@/lib/mockApiForServiceTab";
import EmptyState from "@/components/EmptyState";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<string>("services");
    const [incidentData, setIncidentData] = useState<RowData[]>([]);
    const [serviceData, setServiceData] = useState<ServiceRowData[]>([]);
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
    const [severity, setSeverity] = useState<string>("High");
    const [status, setStatus] = useState<string>("Open");
    useEffect(() => {
        const loadData = async () => {
            if (activeTab === "incidents") {
                const res = await fetchIncidents();
                setIncidentData(res);
            } else if (activeTab === "services") {
                const res = await fetchServices();
                setServiceData(res);
            }
        };

        loadData();
    }, [activeTab]);
    const filteredIncidents = incidentData.filter((item) => {
        const matchSeverity = severity ? item.severity === severity : true;
        const matchStatus = status ? item.status === status : true;
        return matchSeverity && matchStatus;
    });
    return (
        <div className="p-6 bg-white min-h-screen">
            <Tabs
                tabs={dashboardConfig.tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {activeTab === "incidents" && (
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
            {activeTab === "services" && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {serviceData.length>0 && serviceData.map((item) => (
                            <ServiceCard key={item.id} data={item} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}