import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import styles from "./dialog.module.scss";

function Dialog(props) {
    return <DialogPrimitive.Root {...props} />;
}

function DialogTrigger(props) {
    return <DialogPrimitive.Trigger {...props} />;
}

function DialogPortal(props) {
    return <DialogPrimitive.Portal {...props} />;
}

function DialogClose(props) {
    return <DialogPrimitive.Close {...props} />;
}

function DialogOverlay(props) {
    return (
        <DialogPrimitive.Overlay
            className={styles.dialog__overlay}
            {...props}
        />
    );
}

function DialogContent({ children, ...props }) {
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                className={styles.dialog__content}
                {...props}
            >
                {children}
                <DialogClose className={styles.dialog__close}>
                    <XIcon />
                </DialogClose>
            </DialogPrimitive.Content>
        </DialogPortal>
    );
}

function DialogHeader({ className, ...props }) {
    return (
        <div
            className={`${styles.dialog__header} ${className || ""}`}
            {...props}
        />
    );
}

function DialogTitle(props) {
    return (
        <DialogPrimitive.Title className={styles.dialog__title} {...props} />
    );
}

function DialogDescription(props) {
    return (
        <DialogPrimitive.Description
            className={styles.dialog__description}
            {...props}
        />
    );
}

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
};
