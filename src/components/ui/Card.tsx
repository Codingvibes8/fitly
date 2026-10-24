import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import { cn } from "../../lib/cn";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles = {
  default: "bg-surface border border-border/60",
  outlined: "bg-transparent border border-border",
  elevated: "bg-surface shadow-raised",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = React.forwardRef<
  React.ElementRef<typeof View>,
  CardProps
>(({ variant = "default", padding = "md", className, style, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("rounded-xl", variantStyles[variant], paddingStyles[padding], className)}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
});

Card.displayName = "Card";

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const CardHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  CardHeaderProps
>(({ className, style, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("mb-4", className)}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
});

CardHeader.displayName = "CardHeader";

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const CardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  CardContentProps
>(({ className, style, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(className)}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
});

CardContent.displayName = "CardContent";

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const CardFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  CardFooterProps
>(({ className, style, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn("mt-4 pt-4 border-t border-border/60", className)}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
});

CardFooter.displayName = "CardFooter";