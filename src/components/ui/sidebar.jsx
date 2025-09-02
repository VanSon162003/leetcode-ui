"use client";

import React from "react";
import { cn } from "@/lib/utils";

const Sidebar = React.forwardRef(function Sidebar(
    { className, children, ...props },
    ref
) {
    return (
        <aside
            ref={ref}
            className={cn(
                "flex h-full w-64 flex-col border-r bg-background",
                className
            )}
            {...props}
        >
            {children}
        </aside>
    );
});

const SidebarHeader = React.forwardRef(function SidebarHeader(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={cn("flex h-14 items-center border-b px-4", className)}
            {...props}
        />
    );
});

const SidebarContent = React.forwardRef(function SidebarContent(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={cn("flex-1 overflow-auto py-2", className)}
            {...props}
        />
    );
});

const SidebarFooter = React.forwardRef(function SidebarFooter(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={cn("flex h-14 items-center border-t px-4", className)}
            {...props}
        />
    );
});

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter };
