export type ColumnType = "text" | "chip" | "badge";

export type Column = {
    id: string;
    label: string;
    type?: ColumnType;
};

export type RowData = {
    id: string;
    title: string;
    severity: string;
    status: string;
} & Record<string, string>;