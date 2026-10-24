import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputFocusEvent,
  TextInputSubmitEditingEvent,
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
  onFocus?: (e: TextInputFocusEvent) => void;
  onBlur?: (e: TextInputFocusEvent) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: string;
  returnKeyType?: 'default' | 'go' | 'google' | 'join' | 'next' | 'route' | 'search' | 'send' | 'yahoo' | 'done' | 'emergency-call';
  onSubmitEditing?: (e: TextInputSubmitEditingEvent) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'twitter' | 'web-search' | 'visible-password';
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
      autoCapitalize,
      autoComplete,
      returnKeyType,
      onSubmitEditing,
      keyboardType,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const secureTextEntry = isPassword && !showPassword;

    const handleFocus = (e: TextInputFocusEvent) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: TextInputFocusEvent) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleTrailingPress = () => {
      if (isPassword) {
        setShowPassword(!showPassword);
      }
    };

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
            keyboardType={keyboardType ?? (type === "email" ? "email-address" : type === "number" ? "numeric" : "default")}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            autoCapitalize={autoCapitalize}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            autoComplete={autoComplete as any}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            className={cn(
              "flex-1 text-body text-ink",
              "font-jakarta"
            )}
            style={inputStyle}
            {...props}
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