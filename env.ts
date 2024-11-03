// env.d.ts
declare module '@env' {
  export const MAPBOX_DOWNLOADS_TOKEN: string;
  export const API_URL: string;
  export const API_WEATHER: string;
}

// ui-kitten.d.ts// ui-kitten.d.ts
// ui-kitten.d.ts
declare module '@ui-kitten/components' {
  import {TextProps as RNTextProps, ViewProps} from 'react-native';

  export interface IconProps {
    name: string;
    style?: ViewProps['style'];
  }

  export interface ButtonProps {
    children: React.ReactNode;
    appearance?: 'filled' | 'outline' | 'ghost';
    onPress?: () => void;
    style?: ViewProps['style'];
  }

  export interface KittenTextProps extends RNTextProps {
    category?: string;
  }

  export interface DividerProps {
    style?: ViewProps['style'];
  }

  export const Icon: React.FC<IconProps>;
  export const Button: React.FC<ButtonProps>;
  export const Text: React.FC<KittenTextProps>;
  export const Divider: React.FC<DividerProps>;
  // Declare other components as needed
}
