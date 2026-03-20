"use client";

import { Tabs as MuiTabs, Tab } from "@mui/material";

type TabType = {
    id: string;
    label: string;
};

const Tabs = ({tabs, activeTab, setActiveTab}: {
    tabs: TabType[];
    activeTab: string;
    setActiveTab: (id: string) => void;
}) => {
    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    return (
        <MuiTabs
            value={activeTab}
            onChange={handleChange}

            indicatorColor="primary"
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
            className="mb-4"
        >
            {tabs.map((tab) => (
                <Tab
                    key={tab.id}
                    value={tab.id}
                    label={tab.label}
                    sx={{
                        "&.Mui-selected": {
                            color: "#1976d2",
                            fontWeight: 1000,
                        },
                    }}
                />
            ))}
        </MuiTabs>
    );
};

export default Tabs;