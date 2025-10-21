import { Link, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#f7f0f1ff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Kawasaki</Text>
        <Text style={styles.subtitle}>Badminton</Text>
        <Text style={styles.subtitle}>Online Store</Text>
      </View>

      {/* Page Content */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <Link href="/Products" asChild>
          <Pressable style={styles.navButton}>
            <Text style={styles.navButtonText}>Home</Text>
          </Pressable>
        </Link>
        <Link href="/" asChild>
          <Pressable style={styles.navButton}>
            <Text style={styles.navButtonText}>Search</Text>
          </Pressable>
        </Link>
        <Link href="/favorites" asChild>
          <Pressable style={styles.navButton}>
            <Text style={styles.navButtonText}>Profile</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 140,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#686D76",
  },
  subtitle: {
    color: "#686D76",
    fontSize: 30,
    marginTop: 4,
    fontStyle: "italic",
    opacity: 0.95,
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
  },
  navbar: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#686D76",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
    borderTopWidth: 1,
    borderTopColor: "#F4B5B9",
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  navButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
