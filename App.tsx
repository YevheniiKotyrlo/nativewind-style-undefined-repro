import "./global.css";

import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { styled } from "react-native-css";

const optionalStyle: Record<string, unknown> | undefined = undefined;

const StyledView = styled(View, {
  className: { target: "style" },
});

function Header({ children }: { children: string }): React.JSX.Element {
  return (
    <View className="mb-2 rounded bg-gray-800 px-3 py-1.5">
      <Text className="text-xs font-bold uppercase tracking-wide text-white">
        {children}
      </Text>
    </View>
  );
}

function Pair({
  label,
  expected,
  actual,
}: {
  label: string;
  expected: React.JSX.Element;
  actual: React.JSX.Element;
}): React.JSX.Element {
  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-xs text-gray-500">{label}</Text>
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Text className="mb-0.5 text-xs text-gray-400">Expected</Text>
          {expected}
        </View>
        <View className="flex-1">
          <Text className="mb-0.5 text-xs font-bold text-red-600">Actual</Text>
          {actual}
        </View>
      </View>
    </View>
  );
}

export default function App(): React.JSX.Element {
  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerClassName="px-5 pb-10 pt-12">
      <Text className="text-lg font-bold text-gray-900">
        react-native-css #233
      </Text>
      <Text className="mb-5 text-xs text-gray-400">
        Object.assign in deepMergeConfig — v3.0.4
      </Text>

      {/* ── Test 1: className → ["style"] ── */}
      <Header>1. className → style (fixed in PR #224)</Header>
      <Pair
        label="style={undefined} alongside className"
        expected={
          <View className="rounded-lg bg-blue-500 p-3">
            <Text className="text-center text-xs font-bold text-white">Blue bg</Text>
          </View>
        }
        actual={
          <View className="rounded-lg bg-blue-500 p-3" style={optionalStyle}>
            <Text className="text-center text-xs font-bold text-white">Blue bg</Text>
          </View>
        }
      />

      {/* ── Test 2: contentContainerClassName → contentContainerStyle ── */}
      <Header>2. contentContainerClassName (buggy)</Header>
      <Pair
        label="contentContainerStyle={undefined} alongside contentContainerClassName"
        expected={
          <ScrollView
            className="h-14 rounded-lg border border-gray-300"
            contentContainerClassName="flex-1 items-center justify-center bg-green-500"
          >
            <Text className="text-xs font-bold text-white">Green, centered</Text>
          </ScrollView>
        }
        actual={
          <ScrollView
            className="h-14 rounded-lg border border-gray-300"
            contentContainerClassName="flex-1 items-center justify-center bg-green-500"
            contentContainerStyle={optionalStyle}
          >
            <Text className="text-xs font-bold text-white">Green, centered</Text>
          </ScrollView>
        }
      />

      {/* ── Test 3: custom styled() with object mapping ── */}
      <Header>3. Custom styled() mapping (buggy)</Header>
      <Pair
        label="style={undefined} on styled(View, {className: {target: 'style'}})"
        expected={
          <StyledView className="rounded-lg bg-purple-500 p-3">
            <Text className="text-center text-xs font-bold text-white">Purple bg</Text>
          </StyledView>
        }
        actual={
          <StyledView className="rounded-lg bg-purple-500 p-3" style={optionalStyle}>
            <Text className="text-center text-xs font-bold text-white">Purple bg</Text>
          </StyledView>
        }
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}
