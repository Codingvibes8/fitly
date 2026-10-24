import React from "react";
import { View, ViewProps, StyleProp, ViewStyle } from "react-native";
import { cn } from "../../lib/cn";
import { Text } from "./Text";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";

export type AlertTone = "success" | "danger";

interface AlertProps extends Omit<ViewProps, "style" | "children"> {
  title: string;
  message?: string;
  tone?: AlertTone;
  onDismiss?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const toneStyles: Record<AlertTone, { bg: string; iconBg: string; iconColor: "white"; text: "success" | "danger" }> = {
  success: {
    bg: "bg-success-soft",
    iconBg: "bg-success",
    iconColor: "white",
    text: "success",
  },
  danger: {
    bg: "bg-danger-soft",
    iconBg: "bg-danger",
    iconColor: "white",
    text: "danger",
  },
};

const iconNames: Record<AlertTone, { ios: string; android: string; web: string }> = {
  success: { ios: "checkmark", android: "check", web: "check" },
  danger: { ios: "xmark", android: "close", web: "close" },
};

const Alert = React.forwardRef<React.ElementRef<typeof View>, AlertProps>(
  (
    {
      title,
      message,
      tone = "success",
      onDismiss,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { bg, iconBg, iconColor, text } = toneStyles[tone];
    const iconName = iconNames[tone];

    return (
      <View
        ref={ref}
        className={cn(
          "flex-row items-start gap-3 p-4 rounded-md min-h-12",
          bg,
          className
        )}
        style={style}
        {...props}
      >
        <View className={cn("flex-shrink-0 w-6 h-6 rounded-full items-center justify-center mt-0.5", iconBg)}>
          <Icon name={iconName} size={14} tone={iconColor} />
        </View>
        <View className="flex-1 min-w-0">
          <Text variant="subtitle" tone={text} className="font-jakarta-semibold">
            {title}
          </Text>
          {message && (
            <Text variant="caption" tone={text} className="mt-1">
              {message}
            </Text>
          )}
        </View>
        {onDismiss && (
          <IconButton
            name={{ ios: "xmark", android: "close", web: "close" }}
            size="sm"
            variant="ghost"
            accessibilityLabel="Dismiss"
            onPress={onDismiss}
          />
        )}
      </View>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };