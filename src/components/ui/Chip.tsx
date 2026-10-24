import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { cn } from "../../lib/cn";
import { Text } from "./Text";
import { Icon } from "./Icon";

export type ChipSize = "md" | "sm";
export type ChipTone = "lavender" | "primary" | "success" | "danger" | "accent" | "ink-muted" | "info";

interface ChipProps extends Omit<PressableProps, "children" | "style"> {
  label: string;
  size?: ChipSize;
  tone?: ChipTone;
  selected?: boolean;
  icon?: { ios: string; android: string; web: string };
  className?: string;
  style?: StyleProp<ViewStyle>;
  variant?: "default" | "outline";
}

const Chip = React.forwardRef<React.ElementRef<typeof Pressable>, ChipProps>(
  (
    {
      label,
      size = "md",
      tone = "lavender",
      selected = false,
      icon,
      className,
      style,
      onPress,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      md: "h-12 px-4",
      sm: "h-11 px-3",
    };

    const textVariants = {
      md: "label" as const,
      sm: "footnote" as const,
    };

    const unselectedStyles = "bg-surface border border-border/60";
    const unselectedOutlineStyles = "bg-transparent border border-border/60";
    const selectedStyles: Record<ChipTone, string> = {
      lavender: "bg-lavender-soft text-lavender border-lavender",
      primary: "bg-primary-soft text-primary border-primary",
      success: "bg-success-soft text-success border-success",
      danger: "bg-danger-soft text-danger border-danger",
      accent: "bg-primary-soft text-accent border-accent",
      "ink-muted": "bg-surface-muted text-ink-muted border-border",
      info: "bg-info-soft text-info border-info",
    };
    const selectedOutlineStyles: Record<ChipTone, string> = {
      lavender: "bg-transparent text-lavender border-lavender",
      primary: "bg-transparent text-primary border-primary",
      success: "bg-transparent text-success border-success",
      danger: "bg-transparent text-danger border-danger",
      accent: "bg-transparent text-accent border-accent",
      "ink-muted": "bg-transparent text-ink-muted border-border",
      info: "bg-transparent text-info border-info",
    };

    const isOutline = variant === "outline";

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        className={cn(
          "flex-row items-center gap-2 rounded-full transition-all duration-150",
          "active:opacity-70",
          sizeStyles[size],
          selected ? (isOutline ? selectedOutlineStyles[tone] : selectedStyles[tone]) : (isOutline ? unselectedOutlineStyles : unselectedStyles),
          className
        )}
        style={style}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        {...props}
      >
        {icon && (
          <Icon
            name={icon}
            size={size === "md" ? 16 : 14}
            tone={selected ? tone : "ink-muted"}
          />
        )}
        <Text
          variant={textVariants[size]}
          tone={selected ? tone : "ink"}
          className="font-jakarta-medium"
        >
          {label}
        </Text>
      </Pressable>
    );
  }
);

Chip.displayName = "Chip";

export { Chip };