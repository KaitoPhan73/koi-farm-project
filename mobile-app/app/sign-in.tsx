import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Animated } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/utils/ctx';
import { LinearGradient } from 'expo-linear-gradient';
import { login } from '@/apis/authAPI';
import Toast from 'react-native-toast-message';

export default function SignIn() {
  const { signIn } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailOpacity, setEmailOpacity] = useState(0.5);
  const [passwordOpacity, setPasswordOpacity] = useState(0.5);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleSignIn = async () => {
    try {
      const response = await login(username, password);

    
      signIn({
        token: response.data.token, 
        user: response.data.user, 
      });

      // Điều hướng sau khi đăng nhập thành công
      Toast.show({
        type: 'success',
        text1: 'Chào mừng bạn đến với Golden Koi',
        text2: 'Golden Koi xin chào!',
        position: 'top',
        visibilityTime: 1000,
        autoHide: true,
        onHide: () => router.replace('/'),
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập thất bại vui lòng kiểm tra lại thông tin đăng nhập',
        text2: 'Đăng nhập thất bại',
        position: 'top',
        visibilityTime: 1000,
        autoHide: true,
        onHide: () => router.replace('/'),
      });
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.35,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMW1mOWU3OXh4aTAzcHVkODA4bDdsYjFvaWE1ZHJ6dGkwNXFkam91eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vu0OvzeHRdvHsxiiML/giphy.gif' }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <TextInput
          style={[styles.input, { opacity: emailOpacity, ...styles.inputFocused }]}
          placeholder="UserName"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => {
            setEmailOpacity(0.8);
            setEmailFocused(true);
          }}
          onBlur={() => {
            setEmailOpacity(0.5);
            setEmailFocused(false);
          }}
        />
        <TextInput
          style={[styles.input, { opacity: passwordOpacity, ...styles.inputFocused }]}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onFocus={() => {
            setPasswordOpacity(0.8);
            setPasswordFocused(true);
          }}
          onBlur={() => {
            setPasswordOpacity(0.5);
            setPasswordFocused(false);
          }}
        />
        <Text style={[styles.forgot, styles.forgotRight]}>Quên mật khẩu ?</Text>
        <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignIn}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <LinearGradient
              colors={['#00676b', '#008489', '#009298']}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Đăng Nhập</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => {router.push('/sign-up')}}>
            <Text style={styles.registerButton}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 40,
    color: '#fff',
    letterSpacing: 5,
  },
  input: {
    opacity: 0.5,
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    marginBottom: 15,
    paddingLeft: 30,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 50,
    borderRadius: 50,
    width: '100%',
    shadowColor: '#fff',
    shadowOffset: {
      width: 103,
      height: 100,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 25,
  },
  buttonGradient: {
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputFocused: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 30,
      height: 30,
    },
    shadowOpacity: 1.5,
    shadowRadius: 10,
    elevation: 30,
  },
  forgot: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 20,
  },
  forgotRight: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  registerContainer: {
    opacity: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  registerText: {
    color: 'black',
    fontSize: 16,
  },
  registerButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    backgroundColor: '#C50023',
    paddingHorizontal:15,
    paddingVertical:3,
    borderRadius:30
  },
});
