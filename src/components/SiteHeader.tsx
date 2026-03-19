"use client";
import CloudIcon from "@mui/icons-material/Cloud";
import { Button, Switch, FormControlLabel } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
type Props = {
    onRefresh?: () => void;
    autoRefresh?: boolean;
    setAutoRefresh?: (val: boolean) => void;
};

const SiteHeader = ({ onRefresh, autoRefresh, setAutoRefresh }: Props) => {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-blue-700 text-white shadow-sm">
            <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2 text-base sm:text-lg font-semibold tracking-wide">
                    <CloudIcon fontSize="medium" />
                    <span>Cloud Service Monitor</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={autoRefresh}
                                onChange={(e) =>
                                    setAutoRefresh && setAutoRefresh(e.target.checked)
                                }
                                size="small"
                            />
                        }
                        label="Auto"
                        className="text-white m-0"
                    />
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<RefreshIcon />}
                        onClick={onRefresh}
                        sx={{
                            backgroundColor: "#eceff1",
                            "&:hover": { backgroundColor: "#eceff1" },
                            color: "black",
                            minWidth: "auto",
                            padding: "4px 10px",
                        }}
                    >
                        Refresh
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;