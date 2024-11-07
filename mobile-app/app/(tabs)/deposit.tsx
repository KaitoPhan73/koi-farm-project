import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { styled } from "nativewind";
import { DatePickerModal, registerTranslation, en } from "react-native-paper-dates";
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { CalendarDate } from "react-native-paper-dates"; // Import CalendarDate
import { Picker } from '@react-native-picker/picker'; // Import Picker

// Đăng ký locale
registerTranslation("en", en);

type FormData = {
    name: string;
    contact: string;
    koiType: string;
    selectedTank: string; // Thêm trường cho bể cá
    checkInDate: Date | null;
    checkOutDate: Date | null;
    comments: string;
};

const HomeScreen: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        contact: '',
        koiType: '',
        selectedTank: '', // Khởi tạo trường bể cá
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

        // Kiểm tra tính hợp lệ của ngày
        if (checkInDate && !isNaN(checkInDate.getTime()) && checkOutDate && !isNaN(checkOutDate.getTime())) {
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
            primary: '#FFA500', // Màu cam
            primaryContainer: '#ffe0b2',
        },
    };

    return (
        <PaperProvider theme={MyTheme}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Kí Gửi Cá Koi</Text>

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

                    {/* Phần chọn bể cá */}
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
                        <Text style={styles.dateText}>
                            Ngày Check-in: {formData.checkInDate ? formData.checkInDate.toLocaleDateString() : 'Chưa chọn'}
                        </Text>
                        <Text style={styles.dateText}>
                            Ngày Check-out: {formData.checkOutDate ? formData.checkOutDate.toLocaleDateString() : 'Chưa chọn'}
                        </Text>
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Ghi chú thêm"
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top" // Căn chỉnh nội dung ở đầu
                        style={styles.input}
                        onChangeText={(text) => handleInputChange('comments', text)}
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
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
    scrollView: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Màu xám nhạt
        padding: 20,
    },
    container: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFA500', // Màu cam
        marginBottom: 24,
    },
    input: {
        borderColor: '#D1D5DB', // Màu xám
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#F9FAFB', // Màu xám nhạt
    },
    pickerContainer: {
        borderColor: '#D1D5DB', // Màu xám
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
    },
    picker: {
        height: 50,
    },
    dateText: {
        borderColor: '#D1D5DB',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        textAlign: 'center',
        backgroundColor: '#F9FAFB', // Màu xám nhạt
    },
    submitButton: {
        backgroundColor: '#FFA500', // Màu cam
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    submitButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default styled(HomeScreen);
