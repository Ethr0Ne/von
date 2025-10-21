import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const variantImages = {
  "kawasaki aurora 7 light": require("./../../images/aurora7.jpeg"),
  "kawasaki baghonor s6": require("./../../images/baghonors6.jpg"),
  "kawasaki master 900": require("./../../images/master900.jpg"),
  "kawasaki 900": require("./../../images/shoes.jpeg"),
  "kawasaki traverse": require("./../../images/traverse.webp"),
  "kawasaki schafer": require("./../../images/schafer.jpg"),
  "kawasaki ksb 90": require("./../../images/string2.jpeg"),
  "kawasaki elite 65": require("./../../images/elite65.jpeg"),
  "kawasaki ksb 80": require("./../../images/ksb80.webp"),
  "kawasaki k1f00": require("./../../images/k1f00.webp"),
  "kawasaki bs334": require("./../../images/bs334.jpg"),
  "kawasaki 51045": require("./../../images/51045.jpg"),
};

export default function FoodDetails() {
  const { productId, variantName } = useLocalSearchParams();

  // Get the image based on variantName
  const imageSource = variantImages[String(variantName).toLowerCase()];
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.replace(`/Products/${productId}`)}
      >
        <Text style={styles.backButtonText}>← Back to Products</Text>
      </Pressable>

      <Text style={styles.title}>Details</Text>
      <Text style={styles.label}>Product ID: {productId}</Text>
      <Text style={styles.label}>Variant Name: {variantName}</Text>

      {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      )}

      <button style={styles.addToCartButton}>Add to cart</button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 8,
    backgroundColor: "#E63946",
    borderRadius: 8,
    zIndex: 1,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E63946",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#444",
    marginBottom: 10,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 16,
    marginTop: 20,
    backgroundColor: "#eee",
  },
  addToCartButton: {
    width: 200,
    padding: 15,
    backgroundColor: "#E63946",
    borderRadius: 10,
    color: "#fff",
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
