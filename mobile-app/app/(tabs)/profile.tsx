
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


import CustomInput from '@/components/CustomInput';

// icons
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from '@react-navigation/native'
import Colors from '@/constants/Colors';

const ProfileScreen = () => {
    const { colors } = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{
            paddingBottom: 2 * 32
        }}>
            {/* <TouchableOpacity>
                <Ionicons name={"arrow-back"} color={Colors.iconPrimary} size={24} />
            </TouchableOpacity> */}

            {/* profile image container */}
            <View style={styles.profileImageContainer}>
                <Image source={{ uri: "https://antimatter.vn/wp-content/uploads/2022/04/anh-avatar-doi-nguoi-that-sau-lung-ban-nam.jpg" }} style={styles.profileImage} />
                <TouchableOpacity style={[styles.editIconContainer, {
                    backgroundColor: Colors.orange,
                }]}>
                    <Feather name={"edit-3"} size={24} color={Colors.iconWhite} />
                </TouchableOpacity>
            </View>


            {/* profile details contaienr */}
            <View style={styles.nameRoleContainer}>
                <Text style={[styles.name, {
                    color: Colors.textPrimary
                }]}>User Name</Text>
                <Text style={[styles.role, {
                    color: Colors.textSecondary
                }]}>CUSTOMER</Text>
            </View>


            {/* infult fiels container */}
            <View style={styles.inputFieldsContainer}>
                {/* add all the input fields */}
                <CustomInput
                    label='Full Name'
                    placeholder='John Doe'

                />
                <CustomInput
                    label='Your Email' placeholder='zerodegreecoder@gmail.com'
                    icon={
                        <Ionicons name={"mail-outline"} size={24} color={Colors.iconSecondary} style={styles.icon} />
                    }
                // value
                // handleChange

                />

                <CustomInput
                    label='Phone Number' placeholder='+93123135'
                    icon={
                        <Feather name={"phone"} size={24} color={Colors.iconSecondary} style={styles.icon} />
                    }

                />


                <CustomInput
                    label='Password'
                    placeholder='*******'
                    icon={
                        <AntDesign name={"lock1"} size={24} color={Colors.iconSecondary} style={styles.icon} />
                    }
                    type='password'

                />

            </View>

            {/* logutbutt */}
            <TouchableOpacity style={[styles.logoutButton, {
                borderColor: Colors.orange,
            }]}>
                <Text style={[styles.logoutText, {
                    color: Colors.orange
                }]}>Change Password</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ProfileScreen

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
        borderRadius: 70, // Bo tròn 50% để tạo hình tròn
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
        // fontFamily: "Poppins-SemiBold",
        fontSize: 20,
    },
    role: {
        // fontFamily: "Poppins-Regular",
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
        // fontFamily: "Poppins-Bold",
    }

})