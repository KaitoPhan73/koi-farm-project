import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useStripe } from "@stripe/stripe-react-native"; // Stripe SDK
import { useLocalSearchParams } from "expo-router"; // For getting params in Expo Router

const Checkout = () => {
  const { totalPrice } = useLocalSearchParams<{ totalPrice: any }>(); // Get the total price from params
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Function to fetch the payment intent from your backend
  const fetchPaymentIntent = async () => {
    try {
      // Your backend should provide the clientSecret for Stripe Payment Intent
      const response = await fetch("https://your-api.com/create-payment-intent");
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret); // Save the clientSecret to state
    } catch (error) {
      setPaymentError("Failed to fetch payment intent");
    }
  };

  // Initialize the Payment Sheet with the fetched clientSecret
  const initializePaymentSheet = async () => {
    if (!clientSecret) return; // Wait for clientSecret to be available

    try {
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (error) {
        setPaymentError("Failed to initialize payment sheet");
      }
    } catch (err) {
      setPaymentError("An error occurred during payment setup");
    }
  };

  // Handle the payment process when the user presses the "Pay with Stripe" button
  const handlePayPress = async () => {
    if (!clientSecret) return; // Ensure we have the clientSecret before proceeding

    setLoading(true);
    const { error } = await presentPaymentSheet();
    if (error) {
      setPaymentError(`Payment failed: ${error.message}`);
    } else {
      setPaymentError(null);
      alert("Payment succeeded!");
    }
    setLoading(false);
  };

  // Fetch clientSecret when component mounts
  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  // Initialize the Payment Sheet once clientSecret is available
  useEffect(() => {
    if (clientSecret) {
      initializePaymentSheet();
    }
  }, [clientSecret]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      {paymentError && <Text style={styles.error}>{paymentError}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.price}>Total: {totalPrice} VND</Text>
          <Button title="Pay with Stripe" onPress={handlePayPress} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
});

export default Checkout;
