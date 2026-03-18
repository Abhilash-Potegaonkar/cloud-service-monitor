"use client";

import {
    Drawer,
    Typography,
    Divider,
    Chip,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { RowData } from "@/types";

type Props = {
    open: boolean;
    onClose: () => void;
    data: RowData | null;
};

export default function SidePanel({ open, onClose, data }: Props) {
    const getSeverityColor = (val: string) => {
        const v = val.toLowerCase();
        if (v === "high") return "error";
        if (v === "medium") return "warning";
        if (v === "low") return "success";
        return "default";
    };

    const getStatusColor = (val: string) => {
        const v = val.toLowerCase();
        if (v === "open") return "primary";
        if (v === "resolved") return "success";
        return "default";
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div className="w-[360px] h-full flex flex-col bg-white">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <InfoIcon className="text-blue-500" />
                        <Typography variant="h6" className="font-semibold">
                            Incident Details
                        </Typography>
                    </div>

                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto flex-1">
                    {data ? (
                        <>
                            {/* Title */}
                            <div>
                                <Typography className="text-gray-500 text-xs uppercase">
                                    Title
                                </Typography>
                                <Typography className="text-base font-medium">
                                    {data.title}
                                </Typography>
                            </div>
                            <div className="flex gap-2">
                                <Chip
                                    label={data.severity}
                                    color={getSeverityColor(data.severity)}
                                    size="small"
                                />
                                <Chip
                                    label={data.status}
                                    color={getStatusColor(data.status)}
                                    size="small"
                                />
                            </div>

                            <Divider />


                            <div className="space-y-3">
                                {Object.entries(data).map(([key, value]) => {
                                    if (key === "title" || key === "severity" || key === "status") return null;

                                    return (
                                        <div key={key} className="bg-gray-50 p-2 rounded">
                                            <Typography className="text-xs text-gray-500 uppercase">
                                                {key.replace(/_/g, " ")}
                                            </Typography>
                                            <Typography className="text-sm font-medium">
                                                {value}
                                            </Typography>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <Typography>No data</Typography>
                    )}
                </div>
            </div>
        </Drawer>
    );
}