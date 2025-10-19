import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import { MainLayoutNavigation } from "../components/navigation/MainLayoutNavigation";
import { MainLayoutAppBar } from "../components/navigation/MainLayoutAppBar";
import { MainLayoutStyles } from "./MainLayoutStyles";
import type { MainLayoutProps } from "./MainLayoutProps";

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <Box sx={MainLayoutStyles.root}>
            <MainLayoutAppBar />
            <Drawer variant="permanent" sx={MainLayoutStyles.drawer}>
                <Toolbar />
                <MainLayoutNavigation />
            </Drawer>
            <Box component="main" sx={MainLayoutStyles.content}>
                {children}
            </Box>
        </Box>
    );
}
