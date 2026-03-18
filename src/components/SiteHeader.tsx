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
        <header className="sticky top-0 z-40 w-full border-b bg-blue-700 dark:bg-blue-900 text-white shadow-sm">
            <div className="px-4 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 text-lg font-semibold tracking-wide">
                    <CloudIcon fontSize="medium" />
                    <span>Cloud Service Monitor</span>
                </div>
                <div className="flex items-center gap-4">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={autoRefresh}
                                onChange={(e) => setAutoRefresh && setAutoRefresh(e.target.checked)}
                                color="default"
                            />
                        }
                        label="Auto Refresh"
                        className="text-white"
                    />
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<RefreshIcon className={"text-black"}/>}
                        onClick={onRefresh}
                        sx={{
                            backgroundColor: "#eceff1",
                            "&:hover": { backgroundColor: "#eceff1" },
                            color: "black",

                        }}
                        className={"text-black"}
                    >
                        Refresh
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;