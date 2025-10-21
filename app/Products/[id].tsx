import { Link, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as data from "../data.json";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const product = data.products.find((p) => p.id === Number(id));
  const products = data.products;

  const variantImages = {
    "aurora7": require("./../../images/aurora7.jpeg"),
    "baghonors6": require("./../../images/baghonors6.jpg"),
    "master900": require("./../../images/master900.jpg"),
    "shoe1": require("./../../images/shoes.jpeg"),
    "traverse": require("./../../images/traverse.webp"),
    "schafer": require("./../../images/schafer.jpg"),
    "string1": require("./../../images/string2.jpeg"),
    "elite65": require("./../../images/elite65.jpeg"),
    "ksb80": require("./../../images/ksb80.webp"),
    "socks1": require("./../../images/k1f00.webp"),
    "socks2": require("./../../images/bs334.jpg"),
    "socks3": require("./../../images/51045.jpg"),
  };

  const productImages = {
    raquets: require("./../../images/tectonuc.jpg"),
    shoes: require("./../../images/shoes.jpeg"),
    string: require("./../../images/string2.jpeg"),
    socks: require("./../../images/k1f00.webp"),
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.adoption}</Text>
      <Text style={styles.productDesc}>
        Choose from a variety of {product.name.toLowerCase()} options below 
      </Text>

      <View style={styles.variantList}>
        {product.variants.map((variant, index) => (
          <Link
            href={`/Food?productId=${product.id}&variantName=${encodeURIComponent(variant.name)}`}
            asChild
            key={index}
          >
            <Pressable style={styles.variantCard}>
              <Image
                source={variantImages[variant.image.toLowerCase()]}
                style={styles.variantImage}
              />
              <Text style={styles.variantName}>{variant.name}</Text>
              <Text style={styles.variantPrice}>Price: {variant.price}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Other Products</Text>
      <ScrollView
        horizontal
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {products
          .filter((p) => p.id !== product.id)
          .map((p) => {
            const key = p.name.toLowerCase();
            return (
              <Link href={`/Products/${p.id}`} asChild key={p.id}>
                <Pressable style={styles.categoryCard}>
                  <Image source={productImages[key]} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{p.name}</Text>
                </Pressable>
              </Link>
            );
          })}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#fff",
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#E63946",
  },
  productPrice: {
    fontSize: 20,
    color: "#FFD700",
    marginBottom: 15,
    fontWeight: "bold",
  },
  productDesc: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
    marginBottom: 20,
  },
  variantList: {
    width: "100%",
  },
  variantCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    
  },
  variantName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E63946",
    marginBottom: 5,
  },
  variantImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  variantInfo: {
    fontSize: 14,
    color: "#444",
    marginBottom: 3,
  },
  variantPrice: {
    fontSize: 14,
    color: "#FFD700",
    marginBottom: 5,
  },
  error: {
    fontSize: 18,
    color: "red",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    color: "#E63946",
  },
  categoryScroll: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 8,
  },
  categoryImage: {
    width: 100,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },
});
