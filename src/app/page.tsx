"use client";

import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import Table from "@/components/Table";
import { dashboardConfig } from "@/config/dashboardConfig";
import { fetchIncidents } from "@/lib/mockApi";

import { RowData } from "@/types";
import SidePanel from "@/components/SidePanel";
import Filters from "@/components/Filters";

export default function Dashboard() {
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
    const handleRowClick = (row: RowData) => {
        setSelectedRow(row);
    };
    const [activeTab, setActiveTab] = useState<string>("incidents");
    const [data, setData] = useState<RowData[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const res = await fetchIncidents();
            setData(res);
        };

        loadData();
    }, []);

    const tableConfig = dashboardConfig.tables.incidents;
    const [severity, setSeverity] = useState<string>("High");
    const [status, setStatus] = useState<string>("Open");
    const filteredData = data.filter((item) => {
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
            <Filters
                severity={severity}
                status={status}
                setSeverity={setSeverity}
                setStatus={setStatus}
            />
            <Table
                columns={tableConfig.columns}
                data={filteredData}
                onRowClick={handleRowClick}
            />
            <SidePanel
                open={!!selectedRow}
                onClose={() => setSelectedRow(null)}
                data={selectedRow}
            />
        </div>
    );
}