"use client";
import CloudIcon from "@mui/icons-material/Cloud";
import {Button, Switch, FormControlLabel, IconButton} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
type Props = {
    onRefresh?: () => void;
    autoRefresh?: boolean;
    setAutoRefresh?: (val: boolean) => void;
};
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
    Menu,
    MenuItem,
    FormControl,
    Select,
    InputLabel
} from "@mui/material";
import { useState } from "react";
import { getCurrentUserRole } from "@/lib/auth";
const SiteHeader = ({ onRefresh, autoRefresh, setAutoRefresh }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const role = getCurrentUserRole();
    const [roleState, setRoleState] = useState(role);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        //todo navbar
        <header className="sticky top-0 z-40 w-full border-b bg-[#095899] text-white shadow-sm">
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
                    <IconButton
                        onClick={handleMenuOpen}
                        size="large"
                        sx={{
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.1)",
                            },
                        }}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                    >
                        <MenuItem disableRipple>
                            <FormControl size="small" fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    value={roleState}
                                    label="Role"
                                    onChange={(e) => {
                                        const newRole = e.target.value;
                                        localStorage.setItem("role", newRole);
                                        setRoleState(newRole);
                                        window.location.reload()
                                    }}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="operator">Operator</MenuItem>
                                    <MenuItem value="viewer">Viewer</MenuItem>
                                </Select>
                            </FormControl>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </header>
    );
};

export default SiteHeader;