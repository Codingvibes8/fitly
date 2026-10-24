import React from "react";
import {
  Pressable,
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { cn } from "../../lib/cn";
import { Text } from "./Text";
import { Icon } from "./Icon";

interface StepperProps extends Omit<ViewProps, "style" | "children"> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const Stepper = React.forwardRef<React.ElementRef<typeof View>, StepperProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      disabled = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const handleDecrement = () => {
      if (disabled || value <= min) return;
      onValueChange(value - step);
    };

    const handleIncrement = () => {
      if (disabled || value >= max) return;
      onValueChange(value + step);
    };

    const isMin = value <= min;
    const isMax = value >= max;

    return (
      <View
        ref={ref}
        className={cn(
          "flex-row items-center bg-surface border border-border/60 rounded-full h-12 px-3 gap-2",
          disabled && "opacity-40",
          className
        )}
        style={style}
        {...props}
      >
        <Pressable
          onPress={handleDecrement}
          disabled={disabled || isMin}
          className={cn(
            "w-8 h-8 rounded-full items-center justify-center transition-opacity",
            "active:opacity-70",
            (disabled || isMin) ? "opacity-30" : "text-ink"
          )}
          accessibilityRole="button"
          accessibilityLabel="Decrease"
          accessibilityState={{ disabled: disabled || isMin }}
        >
          <Icon name={{ ios: "minus", android: "remove", web: "remove" }} size={18} tone="ink" />
        </Pressable>
        <Text variant="body" tone="ink" className="font-jakarta-medium w-16 text-center">
          {value}
        </Text>
        <Pressable
          onPress={handleIncrement}
          disabled={disabled || isMax}
          className={cn(
            "w-8 h-8 rounded-full items-center justify-center transition-opacity",
            "active:opacity-70",
            (disabled || isMax) ? "opacity-30" : "text-ink"
          )}
          accessibilityRole="button"
          accessibilityLabel="Increase"
          accessibilityState={{ disabled: disabled || isMax }}
        >
          <Icon name={{ ios: "plus", android: "add", web: "add" }} size={18} tone="ink" />
        </Pressable>
      </View>
    );
  }
);

Stepper.displayName = "Stepper";

export { Stepper };