import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import React from "react";
import LoadingImage from "../assets/images/IntroAnimation.gif";

export const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <SafeAreaView style={styles.loadingContainer}>
        <Image source={LoadingImage} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
