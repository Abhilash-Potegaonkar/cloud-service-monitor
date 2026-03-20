"use client";

import { Button } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
type Props = {
    title?: string;
    description?: string;
    onClear?: () => void;
};

export default function EmptyState({title = "No incidents found", description = "There are currently no incidents to display", onClear,}: Props) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">

            <ErrorOutlineIcon
                sx={{
                    fontSize: 250,
                    color: "#9ca3af",
                    marginBottom: "16px",
                    transition: "all 0.3s ease",
                }}
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {title}
            </h2>
            <p className="text-gray-500 mb-6 max-w-sm">
                {description}
            </p>

            {onClear && (
                <Button onClick={onClear}>
                    Clear Filters
                </Button>
            )}
        </div>
    );
}