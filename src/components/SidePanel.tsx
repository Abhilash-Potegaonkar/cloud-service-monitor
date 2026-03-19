"use client";

import {
    Drawer,
    Typography,
    Divider,
    Chip,
    IconButton, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { RowData } from "@/types";
import { useRef, useState} from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    data: RowData | null;
};
type SaveState = "idle" | "typing" | "saving" | "saved";

const updateNotes = async (notes: string) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(notes), 1000);
    });
};
export default function SidePanel({ open, onClose, data }: Props) {
    const [notes, setNotes] = useState(data?.notes || "");
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
    const [saveState, setSaveState] = useState<SaveState>("idle");

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const currentRequestId = useRef(0);
    const lastSavedValue = useRef("");
    const latestNotesRef = useRef("");

    const handleNotesChange = (value: string) => {
        latestNotesRef.current = value;
        setSaveState("typing");

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            triggerSave(value);
        }, 2000);
    };

    const triggerSave = async (value: string) => {
        const requestId = ++currentRequestId.current;

        setSaveState("saving");

        try {
            await updateNotes(value);

            if (requestId !== currentRequestId.current) return;

            lastSavedValue.current = value;

            if (value !== latestNotesRef.current) {
                setSaveState("typing");
            } else {
                setSaveState("saved");

                setTimeout(() => {
                    if (latestNotesRef.current === lastSavedValue.current) {
                        setSaveState("idle");
                    }
                }, 1500);
            }
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div className="w-[360px] h-full flex flex-col bg-white">
                <div className="flex items-center justify-between px-4 py-3 border-b">
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
                <div className="p-4 space-y-4 overflow-y-auto h-[65vh]">
                    {data ? (
                        <>
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
                                    if (["title", "severity", "status", "notes"].includes(key)) return null;

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
                <div className="border-t p-4 space-y-2 bg-white">
                    <Typography className="text-gray-500 text-xs uppercase">
                        Notes
                    </Typography>

                    <TextField
                        value={notes}
                        onChange={(e) => {
                            setNotes(e.target.value);
                            handleNotesChange(e.target.value);
                        }}
                        placeholder="Add notes..."
                        multiline
                        minRows={4}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />


                    {saveState === "typing" && (
                        <Typography className="text-xs text-gray-500">
                            Unsaved changes
                        </Typography>
                    )}

                    {saveState === "saving" && (
                        <div className="flex items-center gap-2 text-blue-500 text-xs">
                            <span className="animate-spin">⏳</span>
                            Saving...
                        </div>
                    )}

                    {saveState === "saved" && (
                        <Typography className="text-xs text-green-600">
                            ✓ Saved
                        </Typography>
                    )}
                </div>
            </div>
        </Drawer>
    );
}