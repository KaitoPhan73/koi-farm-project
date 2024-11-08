import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';

// Giả sử có một số đơn hàng mẫu
const orders = [
    { _id: '1', createdAt: '2024-11-08', totalPrice: 25 },
    { _id: '2', createdAt: '2024-11-07', totalPrice: 30 },
    { _id: '3', createdAt: '2024-11-06', totalPrice: 40 },
];

const OrderScreen = () => {
    const isLoading = false;  // Biến trạng thái giả lập để kiểm tra ActivityIndicator
    const error = null; // Biến lỗi giả lập

    const renderOrderItem = ({ item }: { item: any }) => (
        <View style={styles.orderItem}>
            <Text style={styles.orderText}>Order ID: {item._id}</Text>
            <Text style={styles.orderText}>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.orderText}>Total: ${item.totalPrice}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                <FlatList
                    data={orders}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item._id}
                />
            )}
            <Button title="Load More Orders" onPress={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    orderItem: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    orderText: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default OrderScreen;
