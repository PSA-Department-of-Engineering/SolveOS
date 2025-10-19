import type { SxProps, Theme } from "@mui/material";

export const appBarStyles: SxProps<Theme> = {
    zIndex: (theme) => theme.zIndex.drawer + 1,
};

export const titleStyles: SxProps<Theme> = {
    flexGrow: 1,
};
