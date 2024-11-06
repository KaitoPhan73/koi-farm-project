import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

// icons
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';

type CustomInputProps = {
    label: string;
    icon?: React.ReactElement;
    placeholder: string;
    type?: string;
    value: string; // Thêm thuộc tính value
    handleChange: (text: string) => void; // Thêm hàm xử lý thay đổi
};

const CustomInput: React.FC<CustomInputProps> = ({ label, icon, placeholder, type, value, handleChange }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.inputLabel, {
                color: Colors.textPrimary,
            }]}>{label}</Text>

            <View style={styles.inputFieldContainer}>
                {icon}
                <TextInput
                    style={[styles.textInput, { color: Colors.textPrimary }]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.iconSecondary}
                    secureTextEntry={type === "password" && secureTextEntry}
                    value={value} // Sử dụng giá trị từ props
                    onChangeText={handleChange} // Sử dụng hàm xử lý từ props
                />
                {
                    type === "password" && (
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <Feather
                                name={secureTextEntry ? "eye" : "eye-off"} size={24}
                                color={Colors.iconSecondary}
                                style={styles.icon} />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    );
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