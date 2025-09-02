"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const Form = React.forwardRef(function Form({ className, ...props }, ref) {
    return <form ref={ref} className={cn("space-y-6", className)} {...props} />;
});

const FormItem = React.forwardRef(function FormItem(
    { className, ...props },
    ref
) {
    return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});

const FormLabel = React.forwardRef(function FormLabel(
    { className, ...props },
    ref
) {
    return (
        <label
            ref={ref}
            className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                className
            )}
            {...props}
        />
    );
});

const FormControl = React.forwardRef(function FormControl({ ...props }, ref) {
    return <Slot ref={ref} {...props} />;
});

const FormDescription = React.forwardRef(function FormDescription(
    { className, ...props },
    ref
) {
    return (
        <p
            ref={ref}
            className={cn("text-[0.8rem] text-muted-foreground", className)}
            {...props}
        />
    );
});

const FormMessage = React.forwardRef(function FormMessage(
    { className, children, ...props },
    ref
) {
    return (
        <p
            ref={ref}
            className={cn(
                "text-[0.8rem] font-medium text-destructive",
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
});

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage };
