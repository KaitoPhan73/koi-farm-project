import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { DatePickerModal, registerTranslation, en } from "react-native-paper-dates";
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { CalendarDate } from "react-native-paper-dates"; // Import CalendarDate
import { Picker } from '@react-native-picker/picker';

// Register locale
registerTranslation("en", en);

type FormData = {
    name: string;
    contact: string;
    koiType: string;
    selectedTank: string;
    checkInDate: Date | null;
    checkOutDate: Date | null;
    comments: string;
};

const HomeScreen: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        contact: '',
        koiType: '',
        selectedTank: '',
        checkInDate: null,
        checkOutDate: null,
        comments: ''
    });

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const handleInputChange = (key: keyof FormData, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = () => {
        console.log("Submitted Data:", formData);
    };

    const openDatePicker = () => {
        setDatePickerVisible(true);
    };

    const onDismiss = () => {
        setDatePickerVisible(false);
    };

    const onConfirm = ({ startDate, endDate }: { startDate: CalendarDate; endDate: CalendarDate }) => {
        const checkInDate = startDate ? new Date(startDate) : null;
        const checkOutDate = endDate ? new Date(endDate) : null;

        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check validity of dates
        if (checkInDate && !isNaN(checkInDate.getTime()) && checkOutDate && !isNaN(checkOutDate.getTime())) {
            if (checkInDate < today || checkOutDate < today) {
                alert("Please select dates from today onwards.");
                return;
            }

            setFormData({
                ...formData,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
            });
        } else {
            console.error("Invalid date values:", startDate, endDate);
        }

        setDatePickerVisible(false);
    };


    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#FFA500',
            primaryContainer: '#ffe0b2',
        },
    };

    return (
        <PaperProvider theme={MyTheme}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.formContainer}>
                    <Text style={styles.headerText}>Kí Gửi Cá Koi</Text>

                    <TextInput
                        placeholder="Họ và tên"
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('name', text)}
                    />

                    <TextInput
                        placeholder="Số điện thoại"
                        keyboardType="phone-pad"
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('contact', text)}
                    />

                    <TextInput
                        placeholder="Loại cá Koi"
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('koiType', text)}
                    />

                    {/* Tank Picker */}
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formData.selectedTank}
                            onValueChange={(itemValue) => handleInputChange('selectedTank', itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Chọn bể cá" value="" />
                            <Picker.Item label="Bể A" value="tankA" />
                            <Picker.Item label="Bể B" value="tankB" />
                            <Picker.Item label="Bể C" value="tankC" />
                        </Picker>
                    </View>

                    <TouchableOpacity onPress={openDatePicker}>
                        <Text style={styles.dateButton}>
                            Ngày Check-in: {formData.checkInDate ? formData.checkInDate.toLocaleDateString() : 'Chưa chọn'}
                        </Text>
                        <Text style={styles.dateButton}>
                            Ngày Check-out: {formData.checkOutDate ? formData.checkOutDate.toLocaleDateString() : 'Chưa chọn'}
                        </Text>
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Ghi chú thêm"
                        multiline
                        numberOfLines={3}
                        autoCapitalize="sentences"
                        textAlignVertical="top"
                        style={styles.textArea}
                        onChangeText={(text) => handleInputChange('comments', text)}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Gửi Đăng Ký</Text>
                    </TouchableOpacity>

                    <DatePickerModal
                        mode="range"
                        locale="en"
                        visible={isDatePickerVisible}
                        onDismiss={onDismiss}
                        startDate={formData.checkInDate ?? new Date()}
                        endDate={formData.checkOutDate ?? new Date()}
                        onConfirm={onConfirm}
                    />
                </View>
            </ScrollView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    contentContainer: {
        padding: 20,
    },
    formContainer: {
        backgroundColor: "white",
        padding: 24,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    headerText: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFA500",
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        marginBottom: 16,
    },
    picker: {
        height: 50,
    },
    dateButton: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        textAlign: "center",
        backgroundColor: "#F9FAFB",
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        height: 80,
    },
    submitButton: {
        backgroundColor: "#FFA500",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    submitButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default HomeScreen;
