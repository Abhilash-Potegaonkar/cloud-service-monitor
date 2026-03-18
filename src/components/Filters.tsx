"use client";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

type Props = {
    severity: string;
    status: string;
    setSeverity: (val: string) => void;
    setStatus: (val: string) => void;
};

const Filters = ({ severity, status, setSeverity, setStatus }: Props) => {
    return (
        <div className="flex gap-4 mb-4">
            <FormControl size="small" className="min-w-[150px]">
                <InputLabel>Severity</InputLabel>
                <Select
                    value={severity}
                    label="Severity"
                    onChange={(e) => setSeverity(e.target.value)}
                    className={"w-36"}

                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                </Select>
            </FormControl>
            <FormControl size="small" className="min-w-[150px]">
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                    className={"w-36"}

                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default Filters;