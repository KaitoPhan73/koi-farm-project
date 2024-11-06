import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomInput from '@/components/CustomInput';
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { useSession } from '@/utils/ctx';
import { Button } from 'react-native-paper';
import apiClient from '@/apis/apiClient';

const ProfileScreen = () => {
    const { colors } = useTheme();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');  // New password state
    const [currentPassword, setCurrentPassword] = useState('');  // Current password state
    const [confirmPassword, setConfirmPassword] = useState('');  // Confirm password state
    const { session, isLoading, signOut } = useSession();
    const userId = session ? JSON.parse(session)?.user?._id : '';  // Extract user ID safely
    const phoneRegex = /^(?:\+84|0)\d{9}$/; // Số điện thoại có hoặc không có mã quốc gia +84
    const isPhoneValid = phoneRegex.test(phone);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isEmailValid = emailRegex.test(email);
    
    const handleLogout = () => {
        Alert.alert(

            "Confirm Logout",
            "Are you sure you want to log out?",
            [

                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: signOut }


            ]

        );
    };

    const handleUpdateProfile = async () => {

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const phoneRegex = /^(?:\+84|0)\d{9}$/; 
        
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid phone number.");
            return;
        }
    
        // Kiểm tra nếu mật khẩu mới và mật khẩu xác nhận không khớp
        if (password !== confirmPassword) {

            Alert.alert('Error', 'Passwords do not match');
            return;
        }
    
        // Cập nhật thông tin người dùng
        const userData = {

            fullName,
            email,
            phone,
            password: password ? password : undefined, // Thêm mật khẩu mới nếu có
        };
    
        try {

            const response = await apiClient.put(`users/${userId}`, userData);
            if (response.status === 200) {

                Alert.alert('Success', 'Profile updated successfully!');
            } else {

                Alert.alert('Error', 'Failed to update profile');
            }
        } catch (error) {

            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile');
        }
    };


    // const handleUpdateProfile = async () => {

    //     // Kiểm tra nếu mật khẩu mới và mật khẩu xác nhận không khớp
    //     if (password !== confirmPassword) {

    //         Alert.alert('Error', 'Passwords do not match');
    //         return;
    //     }
    
    //     // Cập nhật thông tin người dùng
    //     const userData = {

    //         fullName,
    //         email,
    //         phone,
    //         password: password ? password : undefined, // Thêm mật khẩu mới nếu có
    //     };
    
    //     try {

    //         const response = await apiClient.put(`users/${userId}`, userData);
    //         if (response.status === 200) {

    //             Alert.alert('Success', 'Profile updated successfully!');
    //         } else {

    //             Alert.alert('Error', 'Failed to update profile');
    //         }
    //     } catch (error) {

    //         console.error('Error updating profile:', error);
    //         Alert.alert('Error', 'Failed to update profile');
    //     }
    // };

    
    useEffect(() => {
        if (session) {
            const userInfo = JSON.parse(session);
            setFullName(userInfo.user.fullName || '');
            setEmail(userInfo.user.email || '');
            setPhoneNumber(userInfo.user.phone || '');
            setPassword(userInfo.user.password || '');
            console.log(session);
            console.log(userInfo.user.password)
        }
    }, [session]);

return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingBottom: 2 * 32 }}>


        <View style={styles.profileImageContainer}>
            <Image source={{ uri: "https://antimatter.vn/wp-content/uploads/2022/04/anh-avatar-doi-nguoi-that-sau-lung-ban-nam.jpg" }} style={styles.profileImage} />
            <TouchableOpacity style={[styles.editIconContainer, { backgroundColor: Colors.orange }]} onPress={() => {}}>
                <Feather name={"edit-3"} size={24} color={Colors.iconWhite} />
            </TouchableOpacity>

        </View>

        <View style={styles.nameRoleContainer}>

            <Text style={[styles.name, { color: Colors.textPrimary }]}>{fullName || 'User Name'}</Text>
            <Text style={[styles.role, { color: Colors.textSecondary }]}>CUSTOMER</Text>
        </View>

        <View style={styles.inputFieldsContainer}>

            <CustomInput
                label='Full Name'
                placeholder='John Doe'
                value={fullName}
                handleChange={setFullName}
            />

            <CustomInput
                label='Your Email'
                placeholder='zerodegreecoder@gmail.com'
                icon={<Ionicons name={"mail-outline"} size={24} color={Colors.iconSecondary} style={styles.icon} />}
                value={email}
                handleChange={setEmail}
            />

            <CustomInput
                label='Phone Number'
                placeholder='+84'
                icon={<Feather name={"phone"} size={24} color={Colors.iconSecondary} style={styles.icon} />}
                value={phone}
                handleChange={setPhoneNumber}
            />


            {/* New Password input */}
            <CustomInput
                label='New Password'
                placeholder='******'
                icon={<Feather name={"lock"} size={24} color={Colors.iconSecondary} style={styles.icon} />}
                value={password}
                handleChange={setPassword}
                secureTextEntry={true}
            />


            {/* Confirm New Password input */}
            <CustomInput
                label='Confirm New Password'
                placeholder='******'
                icon={<Feather name={"lock"} size={24} color={Colors.iconSecondary} style={styles.icon} />}
                value={confirmPassword}
                handleChange={setConfirmPassword}
                secureTextEntry={true}
            />
        </View>


        <TouchableOpacity style={[styles.updateButton, { borderColor: Colors.orange }]} onPress={handleUpdateProfile}>
            <Text style={[styles.updateText, { color: Colors.orange }]}>Update Profile</Text>
        </TouchableOpacity>


        <Button
            mode="contained"
            onPress={handleLogout}
            style={styles.logoutButton}
            labelStyle={styles.logoutButtonText}>
            Logout
        </Button>
    </ScrollView>


);
};
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileImageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    profileImage: {
        height: 140,
        width: 140,
        borderRadius: 70,
        overflow: "hidden",
    },
    editIconContainer: {
        height: 35,
        width: 35,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -22,
        marginLeft: 45,
    },
    nameRoleContainer: {
        alignItems: "center",
        marginVertical: 8,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    role: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    inputFieldsContainer: {
        marginVertical: 16,
    },
    icon: {
        marginHorizontal: 8,
    },
    updateButton: {
        borderWidth: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginVertical: 16,
    },
    updateText: {
        fontSize: 20,
        fontWeight: '500',
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: Colors.orange,
        paddingVertical: 10,
        borderRadius: 10,
    },
    logoutButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    // logoutButton: {
    //     marginTop: 20,
    //     backgroundColor: Colors.orange,
    //     paddingVertical: 10,
    //     borderRadius: 10,
    // },
    // logoutButtonText: {
    //     fontSize: 18,
    //     color: '#fff',
    // }
    // logoutButton: {
    //     marginTop: 20,
    //     backgroundColor: Colors.orange,
    //     paddingVertical: 10,
    //     borderRadius: 10,
    // },
    // logoutButtonText: {
    //     fontSize: 18,
    //     color: '#fff',
    // }
    // logoutButton: {
    //     marginTop: 20,
    //     backgroundColor: Colors.orange,
    //     paddingVertical: 10,
    //     borderRadius: 10,
    // },
    // logoutButtonText: {
    //     fontSize: 18,
    //     color: '#fff',
    // }
});
