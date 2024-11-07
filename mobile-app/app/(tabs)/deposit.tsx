import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { DatePickerModal, registerTranslation, en } from "react-native-paper-dates";
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { CalendarDate } from "react-native-paper-dates"; // Import CalendarDate
import { Picker } from '@react-native-picker/picker';

// Đăng ký locale
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

        // Lấy ngày hiện tại
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây về 0 để so sánh chỉ với ngày

        // Kiểm tra tính hợp lệ của ngày
        if (checkInDate && !isNaN(checkInDate.getTime()) && checkOutDate && !isNaN(checkOutDate.getTime())) {
            // Kiểm tra nếu ngày check-in hoặc check-out trước ngày hiện tại
            if (checkInDate < today || checkOutDate < today) {
                alert("Vui lòng chọn ngày không trước ngày hiện tại.");
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
            primary: '#FFA500', // Màu cam
            primaryContainer: '#ffe0b2',
        },
    };

    return (
        <PaperProvider theme={MyTheme}>
            <ScrollView
                className="flex-1 bg-gray-100"
                contentContainerStyle={{ padding: 20 }}
            >
                <View className="bg-white p-6 rounded-lg shadow-lg">
                    <Text className="text-center text-2xl font-bold text-orange-600 mb-6">Kí Gửi Cá Koi</Text>

                    <TextInput
                        placeholder="Họ và tên"
                        className="border border-gray-300 p-3 rounded-lg mb-4 focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-200"
                        onChangeText={(text) => handleInputChange('name', text)}
                    />

                    <TextInput
                        placeholder="Số điện thoại"
                        keyboardType="phone-pad"
                        className="border border-gray-300 p-3 rounded-lg mb-4 focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-200"
                        onChangeText={(text) => handleInputChange('contact', text)}
                    />

                    <TextInput
                        placeholder="Loại cá Koi"
                        className="border border-gray-300 p-3 rounded-lg mb-4 focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-200"
                        onChangeText={(text) => handleInputChange('koiType', text)}
                    />

                    {/* Phần chọn bể cá */}
                    <View className="border border-gray-300 mb-4 rounded-lg">
                        <Picker
                            selectedValue={formData.selectedTank}
                            onValueChange={(itemValue) => handleInputChange('selectedTank', itemValue)}
                            style={{ height: 50 }}
                        >
                            <Picker.Item label="Chọn bể cá" value="" />
                            <Picker.Item label="Bể A" value="tankA" />
                            <Picker.Item label="Bể B" value="tankB" />
                            <Picker.Item label="Bể C" value="tankC" />
                            {/* Thêm các tùy chọn bể cá khác nếu cần */}
                        </Picker>
                    </View>

                    <TouchableOpacity onPress={openDatePicker}>
                        <Text className="border border-gray-300 p-3 rounded-lg mb-4 text-center bg-gray-50 hover:bg-gray-200 transition duration-200">
                            Ngày Check-in: {formData.checkInDate ? formData.checkInDate.toLocaleDateString() : 'Chưa chọn'}
                        </Text>
                        <Text className="border border-gray-300 p-3 rounded-lg mb-4 text-center bg-gray-50 hover:bg-gray-200 transition duration-200">
                            Ngày Check-out: {formData.checkOutDate ? formData.checkOutDate.toLocaleDateString() : 'Chưa chọn'}
                        </Text>
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Ghi chú thêm"
                        multiline
                        keyboardType="default"
                        numberOfLines={3}
                        autoCapitalize="sentences"
                        textAlignVertical="top"
                        className="border border-gray-300 p-3 rounded-lg mb-4 focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-200"
                        onChangeText={(text) => handleInputChange('comments', text)}
                    />

                    <TouchableOpacity
                        className="bg-orange-500 p-3 rounded-lg mt-4 hover:bg-orange-600 transition duration-200"
                        onPress={handleSubmit}
                    >
                        <Text className="text-white text-center font-bold">Gửi Đăng Ký</Text>
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

export default styled(HomeScreen);
