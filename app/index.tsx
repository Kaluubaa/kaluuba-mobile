import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '~/context/AuthContext';

export default function Splash() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    const createDotAnim = (animRef: Animated.AnimatedValue | Animated.AnimatedValueXY, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animRef, {
            toValue: -8, // go up
            duration: 250,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(animRef, {
            toValue: 0, // return down
            duration: 250,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    createDotAnim(dot1, 0).start();
    createDotAnim(dot2, 150).start();
    createDotAnim(dot3, 300).start();

    if (!loading) {
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/auth');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [loading, isAuthenticated]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#033726', '#064C36', '#0A6045']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 34,
              fontWeight: '900',
              letterSpacing: 1,
              fontFamily: 'font-interBold'
            }}

            className='font-interBold'
          >
            Kaluuba
          </Text>

          {/* Flapping Dots */}
          <View style={{ flexDirection: 'row', marginTop: 18 }}>
            <Animated.View
              style={{
                height: 8,
                width: 8,
                borderRadius: 50,
                backgroundColor: '#CDEFE0',
                marginHorizontal: 4,
                transform: [{ translateY: dot1 }],
              }}
            />

            <Animated.View
              style={{
                height: 8,
                width: 8,
                borderRadius: 50,
                backgroundColor: '#A4DBC6',
                marginHorizontal: 4,
                transform: [{ translateY: dot2 }],
              }}
            />

            <Animated.View
              style={{
                height: 8,
                width: 8,
                borderRadius: 50,
                backgroundColor: '#7CC8AD',
                marginHorizontal: 4,
                transform: [{ translateY: dot3 }],
              }}
            />
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}
