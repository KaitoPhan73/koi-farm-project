import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

// icons
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';

type CustomInputProps = {
    label: string,
    icon?: React.ReactElement,
    placeholder: string,
    type?: string
}
const CustomInput: React.FC<CustomInputProps> = ({ label, icon, placeholder, type, ...rest }) => {
    const [secureTextEntery, setSecureTextEntery] = useState(true);
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.inputLabel, {
                color: Colors.textPrimary,
            }]}>{label}</Text>

            <View style={styles.inputFieldContainer}>
                {icon}
                {/* <Ionicons name={"mail-outline"} size={iconSize.md} color={colors.iconSecondary} style={styles.icon} /> */}
                <TextInput
                    style={[styles.textInput, { color: Colors.textPrimary }]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.iconSecondary}
                    secureTextEntry={type === "password" && secureTextEntery}

                />
                {
                    type === "password" && (
                        <TouchableOpacity onPress={() => setSecureTextEntery(!secureTextEntery)}>
                            <Feather
                                name={secureTextEntery ? "eye" : "eye-off"} size={24}
                                color={Colors.iconSecondary}
                                style={styles.icon} />
                        </TouchableOpacity>
                    )
                }
            </View>

        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        marginVertical: 8
    },
    inputLabel: {
        // fontFamily: "Poppins-SemiBold",
        fontSize: 16,
        marginVertical: 8
    },
    inputFieldContainer: {
        borderWidth: 1,
        borderColor: "#F1ECEC",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        padding: 8
    },
    icon: {
        marginHorizontal: 8
    },
    textInput: {
        flex: 1,
        // fontFamily: "Poppins-Medium",
        fontSize: 16
    }
})