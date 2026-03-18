"use client";

import { useState } from "react";
import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    TablePagination
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";
import {  MouseEvent } from "react";
import { Column, RowData } from "@/types";

type TableProps = {
    columns: Column[];
    data: RowData[];
    onRowClick: (row: RowData) => void;
};

const Table = ({ columns, data, onRowClick }: TableProps) => {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>, row: RowData) => {
        event.stopPropagation(); // prevent row click
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };
    const handleChangePage = (
        _: unknown,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const paginatedData = data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const renderCell = (col: Column, value: string) => {
        // Normalize value
        const val = value.toLowerCase();

        if (col.id === "severity") {
            const colorMap: Record<string, string> = {
                high: "bg-red-100 text-red-700",
                medium: "bg-yellow-100 text-yellow-700",
                low: "bg-green-100 text-green-700"
            };

            return (
                <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                        colorMap[val] || "bg-gray-100 text-gray-700"
                    }`}
                >
        {value}
      </span>
            );
        }

        if (col.id === "status") {
            const statusMap: Record<string, string> = {
                open: "bg-blue-100 text-blue-700",
                resolved: "bg-green-100 text-green-700"
            };

            return (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusMap[val] || "bg-gray-100 text-gray-700"
                    }`}
                >
        {value}
      </span>
            );
        }

        if (col.type === "chip") {
            return <Chip label={value} size="small" />;
        }

        return value;
    };
    const hiddenFields = ["description", "created", "updated"];

    const extraColumns: Column[] =
        data.length > 0
            ? Object.keys(data[0])
                .filter(
                    (key) =>
                        !columns.some((col) => col.id === key) &&
                        key !== "id" &&
                        !hiddenFields.includes(key) // 👈 hide here
                )
                .map((key) => ({
                    id: key,
                    label: key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                }))
            : [];
    const allColumns = [...columns, ...extraColumns];
    return (
        <Paper className="mt-4 shadow-sm">
            <TableContainer>
                <MuiTable>
                    <TableHead className="bg-gray-300">
                        <TableRow>
                            <TableCell className="font-semibold">Sr No</TableCell>

                            {allColumns.map((col) => (
                                <TableCell key={col.id} className="font-semibold">
                                    {col.label}
                                </TableCell>
                            ))}
                            <TableCell className="font-semibold">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedData.map((row, index) => (
                            <TableRow
                                key={row.id}
                                hover
                                onClick={() => onRowClick(row)}
                                className="cursor-pointer"
                            >
                                <TableCell>
                                    {page * rowsPerPage + index + 1}
                                </TableCell>

                                {allColumns.map((col) => (
                                    <TableCell key={col.id}>
                                        {renderCell(col, row[col.id] ?? "")}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton
                                        onClick={(e) => handleMenuOpen(e, row)}
                                        size="small"
                                    >
                                        <MoreHorizIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>

            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem
                    onClick={() => {
                        console.log("View", selectedRow);
                        handleMenuClose();
                    }}
                >
                    View
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        console.log("Resolve", selectedRow);
                        handleMenuClose();
                    }}
                >
                    Resolve
                </MenuItem>
            </Menu>
        </Paper>
    );
};

export default Table;