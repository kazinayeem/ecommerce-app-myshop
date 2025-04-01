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
  const id = user?.id as string;
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, isLoading, isError, error, refetch } = useGetAddressQuery(id);
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
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, [refetch]);

  const deleteAddressHandler = async (id: string) => {
    try {
      await deleteAddress(id).unwrap();
      await refetch();
    } catch (error) {
      console.log(error);
      console.log("Error deleting address");
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
          Error:
          {error && "data" in error
            ? (error.data as { message: string }).message
            : "An unknown error occurred"}
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
              <Text style={styles.addressText}>{item.addressLine1}</Text>
              {item.addressLine2 ? <Text>{item.addressLine2}</Text> : null}
              <Text>{item.country}</Text>
              <Text>{item.district}</Text>
              <Text>{item.division}</Text>
              <Text>{item.union}</Text>
              <Text>{item.upazilla}</Text>
              <Text>{item.zipCode}</Text>
              <FAB
                icon="delete"
                style={styles.fab}
                onPress={() => deleteAddressHandler(item._id)}
              />
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No addresses found.</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {/* Add Address Button */}
      {/* if already 5 adress hide */}
      {data.length < 5 && (
        <FAB
          icon="plus"
          style={styles.fabAdd}
          onPress={() => router.push("/user/address/add-address")}
        />
      )}
      {/* Add Address Button End */}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensures that FlatList takes up full available height
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
    padding: 12,
    elevation: 4, // Adds shadow effect
  },
  addressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#6c6c6c",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#6200ea",
  },
  fabAdd: {
    position: "absolute",
    right: 20,
    bottom: 80, // Added bottom offset to avoid overlap with delete button
    backgroundColor: "#6200ea",
  },
});
