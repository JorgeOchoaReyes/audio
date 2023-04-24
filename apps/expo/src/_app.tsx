import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";

import { HomeScreen } from "./screens/home";
import { SettingsScreen } from "./screens/settings";
import { SignInSignUpScreen } from "./screens/signin";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { tabBarIconType } from "./types";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export const App = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <SignedIn>
        <NavigationContainer>
          <TRPCProvider>
            <SafeAreaProvider>
              <Tab.Navigator
                screenOptions={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: "rgb(31 41 55)",
                  },
                  headerTitleStyle: {
                    color: "white",
                  },
                }}
              >
                <Tab.Screen
                  options={({}) => ({
                    tabBarIcon: ({ focused, color, size }: tabBarIconType) => {
                      return (
                        <Ionicons
                          name={"analytics"}
                          size={size}
                          color={focused ? "black" : color}
                        />
                      );
                    },
                  })}
                  name="Home"
                  component={HomeScreen}
                />
                <Tab.Screen
                  options={({}) => ({
                    tabBarIcon: ({ focused, color, size }: tabBarIconType) => {
                      return (
                        <Ionicons
                          name={"analytics"}
                          size={size}
                          color={focused ? "black" : color}
                        />
                      );
                    },
                  })}
                  name="Home"
                  component={SettingsScreen}
                />
              </Tab.Navigator>
              <StatusBar />
            </SafeAreaProvider>
          </TRPCProvider>
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <SignInSignUpScreen />
      </SignedOut>
    </ClerkProvider>
  );
};
