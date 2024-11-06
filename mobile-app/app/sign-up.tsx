import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Animated } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/utils/ctx';
import { LinearGradient } from 'expo-linear-gradient';
import { register } from '@/apis/authAPI';
import Toast from 'react-native-toast-message';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [usernameOpcaity, setUsernameOpacity] = useState(0.5);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneOpcaity, setPhoneOpcaity] = useState(0.5);
  const [address, setAddress] = useState('');
  const [addressOpcaity, setAddressOpcaity] = useState(0.5);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailOpacity, setEmailOpacity] = useState(0.5);
  const [nameOpacity, setNameOpacity] = useState(0.5);
  const [passwordOpacity, setPasswordOpacity] = useState(0.5);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [name, setName] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSignUp = async () => {
    try {
      const response = await register(username, fullName, email, phone, address, password);
      Toast.show({
        type: 'success',
        text1: 'Đăng Ký Thành Công',
        text2: 'Bạn đã đăng ký thành công!',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
        onHide: () => router.replace('/sign-in'),
      });
    } catch (error) {
      // Kiểm tra xem lỗi có phản hồi không
      if (error.response) {
        const messages = error.response.data.errors.map((err: any) => err.msg); // Lấy thông điệp lỗi từ phản hồi
        setErrorMessages(messages);
      } else {
        // Nếu không có phản hồi, hiển thị thông báo lỗi chung
        setErrorMessages(['Đã xảy ra lỗi, vui lòng thử lại.']);
      }
      Toast.show({
        type: 'error',
        text1: 'Đăng Ký Thất bại',
        text2: 'Bạn đã đăng ký thất bại!',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true
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
        <Text style={styles.title}>Đăng Ký</Text>
        {errorMessages.length > 0 && (
          <View style={styles.errorContainer}>
            {errorMessages.map((msg, index) => (
              <Text key={index} style={styles.errorText}>{msg}</Text>
            ))}
          </View>
        )}
        <TextInput
          style={[styles.input, { opacity: usernameOpcaity, ...styles.inputFocused }]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => {
            setUsernameOpacity(0.8);
            setEmailFocused(true);
          }}
          onBlur={() => {
            setUsernameOpacity(0.5);
            setEmailFocused(false);
          }}
        />
        <TextInput
          style={[styles.input, { opacity: nameOpacity, ...styles.inputFocused }]}
          placeholder="Họ và Tên"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
          autoCorrect={false}
          onFocus={() => {
            setNameOpacity(0.8);
            setEmailFocused(true);
          }}
          onBlur={() => {
            setNameOpacity(0.5);
            setEmailFocused(false);
          }}
        />
        <TextInput
          style={[styles.input, { opacity: emailOpacity, ...styles.inputFocused }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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
          style={[styles.input, { opacity: phoneOpcaity, ...styles.inputFocused }]}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => {
            setPhoneOpcaity(0.8);
            setEmailFocused(true);
          }}
          onBlur={() => {
            setPhoneOpcaity(0.5);
            setEmailFocused(false);
          }}
        />
        <TextInput
          style={[styles.input, { opacity: addressOpcaity, ...styles.inputFocused }]}
          placeholder="Địa chỉ"
          value={address}
          onChangeText={setAddress}
          autoCapitalize="words"
          autoCorrect={false}
          onFocus={() => {
            setAddressOpcaity(0.8);
            setEmailFocused(true);
          }}
          onBlur={() => {
            setAddressOpcaity(0.5);
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
        <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignUp}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <LinearGradient
              colors={['#00676b', '#008489', '#009298']}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Đăng Ký</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => { router.push('/sign-in') }}>
            <Text style={styles.registerButton}>Đăng Nhập</Text>
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
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 30
  },
  errorContainer: {
    marginBottom: 15,
    backgroundColor: '#ffcccc',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#d8000c',
    fontWeight: 'bold',
  },
});
