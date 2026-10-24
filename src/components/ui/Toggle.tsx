import React from "react";
import { Switch, SwitchProps, StyleProp, ViewStyle } from "react-native";
import { cn } from "../../lib/cn";

interface ToggleProps extends Omit<SwitchProps, "style" | "trackColor" | "thumbColor"> {
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const Toggle = React.forwardRef<React.ElementRef<typeof Switch>, ToggleProps>(
  (
    {
      className,
      style,
      value,
      onValueChange,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Switch
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        trackColor={{ false: "#E5E7EB", true: "#FFC629" } as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        thumbColor={{ false: "#FFFFFF", true: "#0B0B1A" } as any}
        style={style}
        className={cn(className)}
        {...props}
      />
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };