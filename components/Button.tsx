"use client";

import { addCurrentLocale, cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithRef, FC, ReactNode, forwardRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button"> & {
    variant?:
        | "primary"
        | "primary-inverse"
        | "secondary"
        | "secondary-inverse"
        | "tertiary"
        | "tertiary-inverse"
        | "icon-primary"
        | "icon-primary-inverse"
        | "icon-secondary"
        | "icon-secondary-inverse";
    size?: "sm" | "md";
    ariaLabel?: string;
};

export const Button: FC<ButtonProps> = forwardRef<
    HTMLButtonElement,
    ButtonProps
>((props, ref) => {
    const {
        ariaLabel,
        children,
        variant = "primary",
        size = "md",
        onClick,
        ...otherProps
    } = props;

    return (
        <button
            ref={ref}
            {...otherProps}
            onClick={onClick}
            aria-label={ariaLabel}
            className={cn(
                otherProps?.className,
                "space-nowrap inline-block whitespace-nowrap rounded-full px-6 py-3 text-center text-sm font-medium leading-[150%] md:text-center md:text-base",
                {
                    "px-4 py-3": size === "sm",
                    "bg-interactive-primary-default text-text-inverse hover:bg-interactive-primary-darker active:bg-interactive-primary-darkest disabled:bg-interactive-disabled":
                        variant === "primary",
                    "bg-surface-primary text-text-primary hover:bg-interactive-secondary-light active:bg-interactive-secondary-default disabled:bg-interactive-secondary-light disabled:text-interactive-disabled":
                        variant === "primary-inverse",
                    "border border-border-primary bg-[transparent] text-text-primary hover:bg-interactive-secondary-lighter active:bg-interactive-secondary-light disabled:bg-[transparent] disabled:text-interactive-disabled":
                        variant === "secondary",
                    "border border-border-secondary bg-[transparent] text-text-inverse hover:bg-interactive-secondary-darkest active:bg-interactive-secondary-darker disabled:border-interactive-disabled disabled:bg-[transparent] disabled:text-interactive-disabled":
                        variant === "secondary-inverse",
                    "bg-interactive-secondary-lightest text-text-primary hover:bg-interactive-secondary-lighter active:bg-interactive-secondary-light disabled:bg-interactive-secondary-lighter disabled:text-interactive-disabled":
                        variant === "tertiary",
                    "bg-[transparent] text-text-inverse hover:bg-interactive-secondary-darkest active:bg-interactive-secondary-darker disabled:bg-[transparent] disabled:text-interactive-disabled":
                        variant === "tertiary-inverse",
                    "rounded-full bg-interactive-secondary-lightest p-4 text-text-primary hover:bg-interactive-secondary-lighter active:bg-interactive-secondary-light disabled:bg-surface-secondary disabled:text-interactive-disabled":
                        variant === "icon-primary",
                    "rounded-full border-[1px] border-border-primary bg-[transparent] p-4 text-text-primary hover:bg-interactive-secondary-lightest active:bg-interactive-secondary-lighter disabled:border-interactive-disabled disabled:bg-[transparent] disabled:text-interactive-disabled":
                        variant === "icon-secondary",
                    "rounded-full bg-[transparent] p-4 text-text-inverse hover:bg-interactive-secondary-darkest active:bg-interactive-secondary-darker disabled:bg-[transparent] disabled:text-interactive-disabled":
                        variant === "icon-primary-inverse",
                    "rounded-full border-[1px] border-border-secondary bg-[transparent] p-4 text-text-inverse hover:bg-interactive-secondary-darkest active:bg-interactive-secondary-darker disabled:border-interactive-disabled disabled:bg-[transparent] disabled:text-interactive-disabled":
                        variant === "icon-secondary-inverse",
                    "p-3":
                        (variant === "icon-primary-inverse" ||
                            variant === "icon-secondary-inverse" ||
                            variant === "icon-secondary" ||
                            variant === "icon-primary") &&
                        size === "sm",
                },
            )}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

type ButtonLinkProps = ComponentPropsWithRef<"a"> & {
    variant?:
        | "primary"
        | "primary-inverse"
        | "secondary"
        | "secondary-inverse"
        | "tertiary"
        | "tertiary-inverse"
        | "icon"
        | "icon-inverse";
    href: string;
    isExternal?: boolean;
    target?: string;
    children?: ReactNode;
};

export const ButtonLink: FC<ButtonLinkProps> = forwardRef<
    HTMLAnchorElement,
    ButtonLinkProps
>((props, ref) => {
    const {
        variant = "primary",
        href,
        isExternal = false,
        target = "_self",
        children,
        ...otherProps
    } = props;

    const pathname = usePathname();
    const LinkComponent = isExternal ? "a" : Link;

    return (
        <LinkComponent
            ref={ref}
            href={isExternal ? href : addCurrentLocale(href, pathname)}
            target={target}
            className={cn(
                otherProps?.className,
                "inline-block whitespace-nowrap rounded-full px-6 py-3 text-center text-sm font-medium leading-[150%] md:text-center md:text-base",
                {
                    // Primary
                    "bg-interactive-primary-default text-text-inverse hover:bg-interactive-primary-darker active:bg-interactive-primary-darkest disabled:bg-interactive-disabled":
                        variant === "primary",
                    // Primary-inverse
                    "bg-surface-primary text-text-primary hover:bg-interactive-secondary-light active:bg-interactive-secondary-default disabled:bg-interactive-secondary-light disabled:text-interactive-disabled":
                        variant === "primary-inverse",

                    // // Secondary
                    "border border-border-primary bg-[transparent] text-text-primary hover:bg-interactive-secondary-lighter active:bg-interactive-secondary-light disabled:bg-[transparent] disabled:text-interactive-disabled":
                        variant === "secondary",
                    // // Secondary-inverse
                    "border border-border-secondary bg-[transparent] text-text-inverse hover:bg-interactive-secondary-darkest active:bg-interactive-secondary-darker disabled:border-interactive-disabled disabled:text-interactive-disabled":
                        variant === "secondary-inverse",

                    // // Tertiary / Icon
                    "bg-interactive-secondary-lightest text-text-primary hover:bg-interactive-secondary-lighter active:bg-interactive-secondary-default disabled:bg-interactive-secondary-lighter disabled:text-interactive-disabled":
                        variant === "tertiary" || variant === "icon",
                    // // Tertiary-inverse / Icon-inverse
                    "bg-surface-inverse text-text-inverse hover:bg-interactive-secondary-darkest active:bg-interactive-secondary-darker disabled:bg-surface-inverse disabled:text-interactive-disabled":
                        variant === "tertiary-inverse" || variant === "icon-inverse",
                },
            )}
        >
            {children}
        </LinkComponent>
    );
});

ButtonLink.displayName = "ButtonLink";

export const ButtonDropdown: FC<ButtonProps> = forwardRef<
    HTMLButtonElement,
    ButtonProps
>((props, ref) => {
    const {
        ariaLabel,
        children,
        variant = "primary",
        size = "md",
        onClick,
        ...otherProps
    } = props;

    return (
        <button
            ref={ref}
            {...otherProps}
            onClick={onClick}
            aria-label={ariaLabel}
            className={cn(
                "flex w-full justify-start px-8 py-4 outline-none hover:bg-interactive-secondary-lightest disabled:pointer-events-none disabled:opacity-50",
                otherProps?.className,
            )}
        >
            {children}
        </button>
    );
});

ButtonDropdown.displayName = "ButtonDropdown";

export const ButtonDropdownLink: FC<ButtonLinkProps> = forwardRef<
    HTMLAnchorElement,
    ButtonLinkProps
>((props, ref) => {
    const {
        variant = "primary",
        href,
        isExternal = false,
        target = "_self",
        children,
        ...otherProps
    } = props;

    const pathname = usePathname();
    const LinkComponent = isExternal ? "a" : Link;

    return (
        <LinkComponent
            ref={ref}
            href={isExternal ? href : addCurrentLocale(href, pathname)}
            target={target}
            className={cn(
                "flex w-full justify-start px-8 py-4 outline-none hover:bg-interactive-secondary-lightest disabled:pointer-events-none disabled:opacity-50",
                otherProps?.className,
            )}
        >
            {children}
        </LinkComponent>
    );
});

ButtonDropdownLink.displayName = "ButtonDropdownLink";
