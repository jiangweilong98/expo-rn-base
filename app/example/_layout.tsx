// app/example/_layout.tsx
import { Stack } from 'expo-router';

export default function ExampleLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // 隐藏该分组下所有页面的 header
        animation: 'fade', // 统一设置页面切换动画
      }}
    />
  );
}
