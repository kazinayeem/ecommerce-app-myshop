import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet } from "react-native";

interface CustomBottomSheetProps {
  bottomSheetContent: React.ReactNode;
  bottomSheetRef: React.RefObject<BottomSheet>;
}
export default function CustomBottomSheet({
  bottomSheetContent,
  bottomSheetRef,
}: CustomBottomSheetProps) {
  // Define the snap points for the bottom sheet
  const snapPoints = React.useMemo(() => ["1", "40%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#ffffff" }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          opacity={0.6}
        />
      )}
    >
      <BottomSheetView style={styles.sheetContent}>
        {bottomSheetContent}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
});
