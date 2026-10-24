import React from "react";
import {
  Pressable,
  PressableProps,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { cn } from "../../lib/cn";
import { Icon } from "./Icon";
import { Text } from "./Text";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "sm";

interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      trailingIcon,
      loading,
      disabled,
      className,
      style,
      children,
      onPress,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyles = `
      flex-row items-center justify-center rounded-full
      transition-opacity duration-150
      ${isDisabled ? "opacity-40" : "active:opacity-70"}
    `;

    const variantStyles = {
      primary: "bg-primary text-ink",
      secondary: "bg-surface border border-border/60 text-ink",
    };

    const sizeStyles = {
      md: "h-14 px-6",
      sm: "h-10 px-4",
    };

    const textVariant = variant === "primary" ? "button" : "buttonSecondary";

    return (
      <Pressable
        ref={ref}
        onPress={isDisabled ? undefined : onPress}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        style={style}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        {...props}
      >
        {loading ? (
          <Icon name={{ ios: "arrow.clockwise", android: "sync", web: "sync" }} size={20} tone="ink" className="animate-spin" />
        ) : icon ? (
          <View className="mr-2">{icon}</View>
        ) : null}
        <Text variant={textVariant} tone="ink" className="font-jakarta-semibold">
          {children}
        </Text>
        {trailingIcon && !loading && !icon && <View className="ml-2">{trailingIcon}</View>}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export { Button };