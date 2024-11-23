declare module '@env' {
  export const MAPBOX_DOWNLOADS_TOKEN: string;
  export const API_URL: string;
  export const API_WEATHER: string;
}

declare module '@ui-kitten/components' {
  import {TextProps as RNTextProps, ViewProps, TextInputProps} from 'react-native';

  export interface Mapping {
    [key: string]: any;
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

  export interface InputProps extends TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    style?: ViewProps['style'];
  }

  export interface KittenTextProps extends RNTextProps {
    category?: string;
  }

  export const Icon: React.FC<IconProps>;
  export const Button: React.FC<ButtonProps>;
  export const Input: React.FC<InputProps>;
  export const Text: React.FC<KittenTextProps>;

  export const ApplicationProvider: React.FC<{
    mapping?: Mapping;
    theme?: any; // Define a specific type if needed
    children: React.ReactNode;
  }>;

  export const IconRegistry: React.FC<{
    icons: any;
  }>;
}
