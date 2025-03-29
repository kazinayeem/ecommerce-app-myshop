import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

interface ProductColorProps {
  colorOptions: string[];
  setSelectedColor: (color: string) => void;
  selectedColor: string;
}

export default function ProductColor({
  colorOptions,
  selectedColor,
  setSelectedColor,
}: ProductColorProps) {
  return (
    <View>
      {colorOptions.length > 0 && (
        <View style={styles.colorContainer}>
          <Text style={styles.colorText}>Select Color</Text>
          <RadioButton.Group
            onValueChange={(newColor) => setSelectedColor(newColor)}
            value={selectedColor}
          >
            <View style={styles.colorOptionsRow}>
              {colorOptions.map((color: string, index: number) => (
                <View key={index} style={styles.colorOption}>
                  <RadioButton value={color} color={color} />
                  <Text>{color}</Text>
                </View>
              ))}
            </View>
          </RadioButton.Group>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    marginBottom: 16,
  },
  colorText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  colorOptionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  colorOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15, // Add spacing between options
  },
});
