import type { SxProps, Theme } from "@mui/material/styles";

const drawerWidth = 240;

export const MainLayoutStyles = {
    root: {
        display: "flex",
        minHeight: "100vh",
    } as SxProps<Theme>,

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
        },
    } as SxProps<Theme>,

    appBar: {
        zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
    } as SxProps<Theme>,

    content: {
        flexGrow: 1,
        p: 3,
        mt: 8,
    } as SxProps<Theme>,
};
