import React from "react";
import { View, ViewProps, StyleProp, ViewStyle } from "react-native";
import { cn } from "../../lib/cn";
import { Text } from "./Text";
import { Icon } from "./Icon";

export type BadgeTone = "primary" | "success" | "promo" | "info" | "lavender" | "danger" | "accent" | "ink-muted";
export type BadgeSize = "sm" | "md";

interface BadgeProps extends Omit<ViewProps, "style" | "children"> {
  label: string;
  tone?: BadgeTone;
  icon?: { ios: string; android: string; web: string };
  size?: BadgeSize;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const toneStyles: Record<BadgeTone, { bg: string; text: string }> = {
  primary: { bg: "bg-primary-soft", text: "text-ink" },
  success: { bg: "bg-success-soft", text: "text-success" },
  promo: { bg: "bg-promo-soft", text: "text-ink" },
  info: { bg: "bg-info-soft", text: "text-info" },
  lavender: { bg: "bg-lavender-soft", text: "text-lavender" },
  danger: { bg: "bg-danger-soft", text: "text-danger" },
  accent: { bg: "bg-primary-soft", text: "text-accent" },
  "ink-muted": { bg: "bg-surface-muted", text: "text-ink-muted" },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "h-7 px-2.5",
  md: "h-9 px-3",
};

const getIconTone = (tone: BadgeTone): "success" | "info" | "ink" | "lavender" | "danger" | "accent" => {
  if (tone === "success") return "success";
  if (tone === "info") return "info";
  if (tone === "lavender") return "lavender";
  if (tone === "danger") return "danger";
  if (tone === "accent") return "accent";
  return "ink";
};

const getTextTone = (tone: BadgeTone): "success" | "info" | "ink" | "lavender" | "danger" | "accent" => {
  if (tone === "success") return "success";
  if (tone === "info") return "info";
  if (tone === "lavender") return "lavender";
  if (tone === "danger") return "danger";
  if (tone === "accent") return "accent";
  return "ink";
};

const Badge = React.forwardRef<React.ElementRef<typeof View>, BadgeProps>(
  (
    {
      label,
      tone = "primary",
      icon,
      size = "md",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { bg, text } = toneStyles[tone];
    const iconTone = getIconTone(tone);
    const textTone = getTextTone(tone);

    return (
      <View
        ref={ref}
        className={cn(
          "flex-row items-center gap-1.5 rounded-full",
          bg,
          text,
          sizeStyles[size],
          className
        )}
        style={style}
        {...props}
      >
        {icon && <Icon name={icon} size={size === "sm" ? 10 : 12} tone={iconTone} />}
        <Text variant="caption" tone={textTone} className="font-jakarta-medium">
          {label}
        </Text>
      </View>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };