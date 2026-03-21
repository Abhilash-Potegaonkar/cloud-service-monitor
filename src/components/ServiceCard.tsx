"use client";

import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    LinearProgress,
} from "@mui/material";
import { Email, Storage, Chat, Business } from "@mui/icons-material";

type ServiceRowData = {
    id: string;
    service: string;
    status: string;
    uptime: number;
    incidents: number;
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "Healthy":
            return "success";
        case "Degraded":
            return "warning";
        case "Down":
            return "error";
        default:
            return "default";
    }
};

const getServiceIcon = (service: string) => {
    switch (service) {
        case "Email":
            return <Email />;
        case "Drive":
            return <Storage />;
        case "CRM":
            return <Business />;
        case "Chat":
            return <Chat />;
        default:
            return <Storage />;
    }
};

export default function ServiceCard({ data }: { data: ServiceRowData }) {
    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 2,
                transition: "0.3s",
                "&:hover": {
                    boxShadow: 3,
                    // transform: "translateY(-4px)",
                },
            }}
            className="h-[25vh] xl:h-[33vh] 2xl:h-[28vh] lg:h-[40vh] md:h-[55vh] sm:h-[30vh]"
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                        {getServiceIcon(data.service)}
                        <Typography variant="h6" fontWeight={600}>
                            {data.service}
                        </Typography>
                    </Box>

                    <Chip
                        label={data.status}
                        color={getStatusColor(data.status)}
                        size="small"
                    />
                </Box>
                <Box mt={3}>
                    <Typography variant="body2" color="text.secondary">
                        Uptime
                    </Typography>

                    <Typography variant="h6" fontWeight={600}>
                        {data.uptime}%
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={data.uptime}
                        sx={{
                            height: 8,
                            borderRadius: 5,
                            mt: 1,
                        }}
                    />
                </Box>
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                        Incidents
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight={600}
                        color={data.incidents > 5 ? "error.main" : "text.primary"}
                    >
                        {data.incidents}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}