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

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: { ios: string; android: string; web: string };
}

interface SegmentedControlProps extends Omit<ViewProps, "style" | "children"> {
  options: SegmentedControlOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const SegmentedControl = React.forwardRef<React.ElementRef<typeof View>, SegmentedControlProps>(
  (
    {
      options,
      value,
      onValueChange,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn(
          "flex-row bg-surface-muted rounded-full p-1 h-12",
          className
        )}
        style={style}
        {...props}
      >
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onValueChange(option.value)}
              className={cn(
                "flex-row items-center gap-2 px-4 rounded-full h-full transition-all duration-150",
                isSelected
                  ? "bg-ink text-white shadow-card"
                  : "text-ink-muted active:bg-surface"
              )}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              {option.icon && (
                <Icon
                  name={option.icon}
                  size={18}
                  tone={isSelected ? "white" : "ink-muted"}
                />
              )}
              <Text variant="label" tone={isSelected ? "white" : "ink-muted"} className="font-jakarta-medium">
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }
);

SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };