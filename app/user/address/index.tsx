import {
  useDeleteAddressMutation,
  useGetAddressQuery,
} from "@/redux/api/addressApi";
import { useAppSelector } from "@/redux/hook/hooks";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Card, FAB } from "react-native-paper";

export default function Index() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id as string;

  const [refreshing, setRefreshing] = React.useState(false);
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAddressQuery(userId);
  const [deleteAddress] = useDeleteAddressMutation();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch()
      .unwrap()
      .finally(() => setRefreshing(false));
  }, [refetch]);

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddress(addressId).unwrap();
      refetch();
    } catch (err) {
      console.log("Error deleting address:", err);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator animating={true} size="large" color="#6200ea" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>
          {error && "data" in error
            ? (error.data as { message: string }).message
            : "An error occurred while fetching addresses."}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.addressTitle}>{item.addressLine1}</Text>
              {item.addressLine2 && <Text>{item.addressLine2}</Text>}
              <Text>{item.country}</Text>
              <Text>{item.district}</Text>
              <Text>{item.division}</Text>
              <Text>{item.union}</Text>
              <Text>{item.upazilla}</Text>
              <Text>{item.zipCode}</Text>
              <FAB
                icon="delete"
                style={styles.fabDelete}
                small
                onPress={() => handleDeleteAddress(item._id)}
              />
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No addresses found.</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />

      {data.length < 5 && (
        <FAB
          icon="plus"
          style={styles.fabAdd}
          onPress={() => router.push("/user/address/add-address")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 10,
    padding: 12,
    elevation: 3,
    position: "relative",
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    padding: 20,
  },
  fabDelete: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#ff5252",
    zIndex: 1,
  },
  fabAdd: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#6200ea",
  },
});
