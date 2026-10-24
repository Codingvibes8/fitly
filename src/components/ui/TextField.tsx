import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { cn } from "../../lib/cn";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { IconButton } from "./IconButton";

export type TextFieldType = "text" | "email" | "password" | "number" | "search";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  type?: TextFieldType;
  leadingIcon?: { ios: string; android: string; web: string };
  trailingAccessory?: React.ReactNode;
  error?: string;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  value?: string;
  onChangeText?: (text: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFocus?: (e: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur?: (e: any) => void;
}

const TextField = React.forwardRef<React.ElementRef<typeof TextInput>, TextFieldProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      leadingIcon,
      trailingAccessory,
      error,
      disabled = false,
      className,
      style,
      inputStyle,
      onChangeText,
      onFocus,
      onBlur,
      value,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const secureTextEntry = isPassword && !showPassword;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleTrailingPress = () => {
      if (isPassword) {
        setShowPassword(!showPassword);
      }
    };

    const restProps = props;

    return (
      <View className={cn(className)} style={style}>
        {label && (
          <Text variant="label" tone="ink-muted" className="mb-2">
            {label}
          </Text>
        )}
        <View className="flex-row items-center">
          {leadingIcon && (
            <Icon
              name={leadingIcon}
              size={20}
              tone="ink-muted"
              className="mr-3"
            />
          )}
          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor="ink-subtle"
            secureTextEntry={secureTextEntry}
            keyboardType={type === "email" ? "email-address" : type === "number" ? "numeric" : "default"}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            className={cn(
              "flex-1 text-body text-ink",
              "font-jakarta"
            )}
            style={inputStyle}
            {...restProps}
          />
          {trailingAccessory ? (
            <View className="ml-3">{trailingAccessory}</View>
          ) : isPassword ? (
            <IconButton
              name={showPassword
                ? { ios: "eye.slash", android: "visibility-off", web: "visibility-off" }
                : { ios: "eye", android: "visibility", web: "visibility" }}
              size="sm"
              variant="ghost"
              accessibilityLabel={showPassword ? "Hide password" : "Show password"}
              onPress={handleTrailingPress}
            />
          ) : null}
        </View>
        <View
          className={cn(
            "mt-1.5 h-0.5 rounded-full transition-all duration-150",
            isFocused ? "bg-lavender w-full" : "bg-border/60 w-full",
            error && "bg-danger"
          )}
        />
        {error && (
          <Text variant="caption" tone="danger" className="mt-2">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

TextField.displayName = "TextField";

export { TextField };