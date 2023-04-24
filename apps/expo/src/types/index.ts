import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Landing: undefined;
};

export type NavProps = NativeStackScreenProps<RootStackParamList>;

export interface tabBarIconType {
  color: string;
  focused: boolean;
  size: number;
}
