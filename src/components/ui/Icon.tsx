import React from "react";
import { SymbolView, SymbolViewProps } from "expo-symbols";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
import { cn } from "../../lib/cn";

export type IconTone =
  | "ink"
  | "ink-muted"
  | "ink-subtle"
  | "primary"
  | "lavender"
  | "success"
  | "danger"
  | "accent"
  | "white"
  | "info"
  | string; // Allow arbitrary color strings

const toneClasses: Record<string, string> = {
  ink: "text-ink",
  "ink-muted": "text-ink-muted",
  "ink-subtle": "text-ink-subtle",
  primary: "text-primary",
  lavender: "text-lavender",
  success: "text-success",
  danger: "text-danger",
  accent: "text-accent",
  white: "text-white",
  info: "text-info",
};

interface IconProps extends Omit<SymbolViewProps, "name" | "weight" | "color" | "style"> {
  name: { ios: string; android: string; web: string } | string;
  size?: number;
  tone?: IconTone;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const Icon = ({ name, size = 24, tone = "ink", className, style, ...props }: IconProps) => {
  // Resolve platform-specific name
  const resolvedName = typeof name === "object" 
    ? (name as { ios: string; android: string; web: string }).ios 
    : name;

  // Handle arbitrary color strings
  const toneClass = toneClasses[tone] || (tone.startsWith("#") || tone.startsWith("rgb") ? "" : toneClasses.ink);
  const colorStyle = (tone.startsWith("#") || tone.startsWith("rgb")) ? { color: tone } : {};

  return (
    <SymbolView
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name={resolvedName as any}
      weight="medium"
      size={size}
      className={cn(toneClass, className)}
      style={[{ ...colorStyle } as TextStyle, style]}
      {...props}
    />
  );
};

Icon.displayName = "Icon";