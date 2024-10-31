import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '@/components/CustomInput';
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';

const ProfileScreen = () => {
    const { colors } = useTheme();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{
            paddingBottom: 2 * 32
        }}>
            <View style={styles.profileImageContainer}>
                <Image source={{ uri: "https://antimatter.vn/wp-content/uploads/2022/04/anh-avatar-doi-nguoi-that-sau-lung-ban-nam.jpg" }} style={styles.profileImage} />
                <TouchableOpacity style={[styles.editIconContainer, { backgroundColor: Colors.orange }]}>
                    <Feather name={"edit-3"} size={24} color={Colors.iconWhite} />
                </TouchableOpacity>
            </View>

            <View style={styles.nameRoleContainer}>
                <Text style={[styles.name, { color: Colors.textPrimary }]}>User Name</Text>
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
                    placeholder='+93123135'
                    icon={<Feather name={"phone"} size={24} color={Colors.iconSecondary} style={styles.icon} />}
                    value={phoneNumber}
                    handleChange={setPhoneNumber}
                />
                <CustomInput
                    label='Password'
                    placeholder='*******'
                    icon={<AntDesign name={"lock1"} size={24} color={Colors.iconSecondary} style={styles.icon} />}
                    type='password'
                    value={password}
                    handleChange={setPassword}
                />
            </View>

            <TouchableOpacity style={[styles.logoutButton, { borderColor: Colors.orange }]}>
                <Text style={[styles.logoutText, { color: Colors.orange }]}>Update</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    profileImageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16
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
        marginLeft: 45
    },
    nameRoleContainer: {
        alignItems: "center",
        marginVertical: 8
    },
    name: {
        fontSize: 20,
    },
    role: {
        fontSize: 16,
    },
    inputFieldsContainer: {
        marginVertical: 16
    },
    icon: {
        marginHorizontal: 8
    },
    logoutButton: {
        borderWidth: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginVertical: 16
    },
    logoutText: {
        fontSize: 20,
    }
});
