import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import Colors from "@/constants/Colors";
import { formatCurrency } from "@/utils/formatter";
import { useSession } from "@/utils/ctx";

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Completed" | "Cancelled";
  orderDate: string;
}

const OrderScreen = () => {
  const { session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) {
        setError("User not authenticated");
        setIsLoading(false);
        return;
      }

      try {
        const userData = JSON.parse(session);
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}orders/user/${userData.user._id}`
        );

        if (!response.data || response.data.length === 0) {
          setOrders([]);
        } else {
          setOrders(response.data);
        }
      } catch (error: any) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 404) {
          setOrders([]); // Set empty array for not found
        } else {
          setError("Failed to load orders. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.emptyText}>No orders found</Text>
        <Text style={styles.subEmptyText}>
          Your order history will appear here
        </Text>
      </View>
    );
  }

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => {
        setSelectedOrder(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.orderText}>Order ID: {item._id}</Text>
      <Text style={styles.orderText}>
        Date: {new Date(item.orderDate).toLocaleDateString()}
      </Text>
      <Text style={styles.orderText}>
        Total: {formatCurrency(item.totalAmount)}
      </Text>
      <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
        Status: {item.status}
      </Text>
    </TouchableOpacity>
  );

  const renderOrderItemDetail = ({ item }: { item: OrderItem }) => (
    <View style={styles.orderItemDetail}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
    </View>
  );

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Completed":
        return Colors.primaryColor;
      case "Cancelled":
        return Colors.primaryColor;
      case "Processing":
        return Colors.primaryColor;
      case "Shipped":
        return Colors.lightGrey;
      default:
        return Colors.primaryColor;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Order Details</Text>
            <Text style={styles.modalOrderId}>
              Order ID: {selectedOrder?._id}
            </Text>
            <Text style={styles.modalDate}>
              Date:{" "}
              {selectedOrder &&
                new Date(selectedOrder.orderDate).toLocaleDateString()}
            </Text>
            <Text
              style={[
                styles.modalStatus,
                { color: getStatusColor(selectedOrder?.status!) },
              ]}
            >
              Status: {selectedOrder?.status}
            </Text>

            <FlatList
              data={selectedOrder?.items}
              renderItem={renderOrderItemDetail}
              keyExtractor={(item) => item._id}
              style={styles.modalList}
            />

            <Text style={styles.modalTotal}>
              Total Amount: {formatCurrency(selectedOrder?.totalAmount || 0)}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  orderItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderText: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalOrderId: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  modalDate: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  modalStatus: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalList: {
    maxHeight: "60%",
  },
  modalTotal: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "right",
  },
  orderItemDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemName: {
    flex: 2,
    fontSize: 16,
  },
  itemQuantity: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  itemPrice: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  subEmptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});

export default OrderScreen;
