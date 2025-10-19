import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import type { ReactElement } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationItem {
    label: string;
    path: string;
    icon: ReactElement;
}

const navigationItems: NavigationItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Orders", path: "/orders", icon: <ShoppingCartIcon /> },
    { label: "Customers", path: "/customers", icon: <PeopleIcon /> },
    { label: "Reports", path: "/reports", icon: <AssessmentIcon /> },
    { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

export function MainLayoutNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <List>
            {navigationItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                    <ListItemButton
                        selected={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}
