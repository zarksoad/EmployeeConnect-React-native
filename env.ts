// env.d.ts
declare module '@env' {
  export const MAPBOX_DOWNLOADS_TOKEN: string;
  export const API_URL: string;
  export const API_WEATHER: string;
}

// ui-kitten.d.ts
// ui-kitten.d.ts
// ui-kitten.d.ts
declare module '@ui-kitten/components' {
  import {TextProps as RNTextProps, ViewProps} from 'react-native';

  export interface Mapping {
    [key: string]: any; // Adjust this based on what properties you need
  }

  export interface IconProps {
    name: string;
    style?: ViewProps['style'];
  }

  export const StyleService: {
    create: (styles: any) => any;
  };

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

  export const ApplicationProvider: React.FC<{
    mapping?: Mapping;
    theme?: any; // You can define a more specific type here
    children: React.ReactNode;
  }>;

  export const IconRegistry: React.FC<{
    icons: any; // You can specify the type more accurately if needed
  }>;
}
