// NativeWind className support for React Native components
import "nativewind";

declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
  interface SwitchProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface TouchableWithoutFeedbackProps {
    className?: string;
  }
}

// Fix for expo-symbols SymbolView name prop
declare module "expo-symbols" {
  interface SymbolViewProps {
    name: { ios: string; android: string; web: string } | string;
  }
}