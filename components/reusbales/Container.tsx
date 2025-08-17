import React from 'react';
import { StatusBar, View, ViewProps, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from './Loader';

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  showStatusBar?: boolean;
  loading?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  showStatusBar = true,
  loading = false,
  ...props
}) => {
  return (
    <View className="relative flex-1">
      <SafeAreaView className={`w-full flex-1 ${className}`} {...props}>
        <View className="flex-1 px-4 py-2">
          {typeof children === 'string' ? <Text>{children}</Text> : children}
        </View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#eeeeee"
          hidden={showStatusBar === false}
        />
      </SafeAreaView>

      {loading && <Loader loading={loading} />}
    </View>
  );
};
