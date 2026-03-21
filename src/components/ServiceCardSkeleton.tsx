"use client";

import {
    Card,
    CardContent,
    Skeleton,
    Box,
} from "@mui/material";

export default function ServiceCardSkeleton() {
    return (
        <Card
            sx={{
                height: "25vh",
                borderRadius: 3,
                boxShadow: 2,
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="text" width={100} height={30} />
                    </Box>

                    <Skeleton variant="rounded" width={60} height={24} />
                </Box>
                <Box mt={3}>
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width={60} height={30} />

                    <Skeleton
                        variant="rounded"
                        height={8}
                        sx={{ mt: 1, borderRadius: 5 }}
                    />
                </Box>
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Skeleton variant="text" width={80} height={20} />
                    <Skeleton variant="text" width={40} height={30} />
                </Box>
            </CardContent>
        </Card>
    );
}