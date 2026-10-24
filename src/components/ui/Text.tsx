import React from "react";
import { Text as RNText, TextProps, StyleProp, TextStyle } from "react-native";
import { cn } from "../../lib/cn";

export type TextVariant =
  | "display"
  | "heading"
  | "title"
  | "subtitle"
  | "body"
  | "label"
  | "button"
  | "buttonSecondary"
  | "caption"
  | "footnote";

export type TextTone =
  | "ink"
  | "ink-muted"
  | "ink-subtle"
  | "primary"
  | "lavender"
  | "success"
  | "danger"
  | "accent"
  | "white"
  | "info";

const variantClasses: Record<TextVariant, string> = {
  display: "text-display",
  heading: "text-heading",
  title: "text-title",
  subtitle: "text-subtitle",
  body: "text-body",
  label: "text-label",
  button: "text-button",
  buttonSecondary: "text-button-secondary",
  caption: "text-caption",
  footnote: "text-footnote",
};

const toneClasses: Record<TextTone, string> = {
  ink: "text-ink",
  "ink-muted": "text-ink-muted",
  "ink-subtle": "text-ink-subtle",
  primary: "text-primary",
  lavender: "text-lavender",
  success: "text-success",
  danger: "text-danger",
  accent: "text-accent",
  white: "text-white",
  info: "text-info",
};

interface TextPropsExt extends Omit<TextProps, "style" | "children"> {
  variant?: TextVariant;
  tone?: TextTone;
  className?: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const Text = React.forwardRef<
  React.ElementRef<typeof RNText>,
  TextPropsExt
>(({ variant = "body", tone = "ink", className, style, children, ...props }, ref) => {
  return (
    <RNText
      ref={ref}
      className={cn(variantClasses[variant], toneClasses[tone], className)}
      style={style}
      {...props}
    >
      {children}
    </RNText>
  );
});

Text.displayName = "Text";