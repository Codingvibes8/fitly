import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { cn } from "../../lib/cn";
import { Icon } from "./Icon";

export type IconButtonSize = "md" | "sm";
export type IconButtonVariant = "default" | "ghost";

interface IconButtonProps extends Omit<PressableProps, "children" | "style"> {
  name: { ios: string; android: string; web: string };
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  accessibilityLabel: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const IconButton = React.forwardRef<React.ElementRef<typeof Pressable>, IconButtonProps>(
  (
    {
      name,
      size = "md",
      variant = "default",
      accessibilityLabel,
      className,
      style,
      onPress,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      md: "w-14 h-14",
      sm: "w-9 h-9",
    };

    const iconSizes = {
      md: 24,
      sm: 18,
    };

    const variantStyles = {
      default: "bg-surface-muted active:opacity-70",
      ghost: "bg-transparent active:bg-surface-muted",
    };

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        className={cn(
          "rounded-full items-center justify-center transition-opacity duration-150",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        style={style}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        {...props}
      >
        <Icon
          name={name}
          size={iconSizes[size]}
          tone="ink"
        />
      </Pressable>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton };