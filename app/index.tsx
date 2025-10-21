import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as data from './data.json';

export default function HomeScreen() {
  const Products = data.products;

  const ThumbNails = [
    require('./../images/tectonuc.jpg'),
    require('./../images/shoes.jpeg'),
    require('./../images/string2.jpeg'),
    require('./../images/k1f00.webp'),
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
      {Products.map((p) => (
        <View key={p.id}>
          <Link href={`./Products/${p.id}`} asChild>
            <Pressable style={styles.customButton}>
              <Image source={ThumbNails[p.id - 1]} style={styles.productImage} resizeMode="cover" />
              <Text style={styles.petTitle}>{p.name}</Text>
              <Text style={styles.petPrice}>{p.adoption}</Text>
            </Pressable>
          </Link>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  customButton: {
    margin: 25,
    padding: 15,
    backgroundColor: '#E63946', // red
    borderRadius: 15,
    width: 180,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  petTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 6,
    color: '#ffffff',
    textAlign: 'center',
  },
  petPrice: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#FFD700',
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
    color: '#E63946',
  },
});
