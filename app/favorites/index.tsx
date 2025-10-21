// import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Profile = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatarUri?: string;
};

export default function FavoritesScreen() {
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "",
    address: "",
    avatarUri: "",
  });
  const [editing, setEditing] = useState(false);
  const STORAGE_KEY = "@user_profile";

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setProfile(JSON.parse(json));
      } catch (e) {
        console.warn("Failed to load profile:", e);
      }
    })();
  }, []);

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setEditing(false);
      Alert.alert("Saved", "Profile saved successfully.");
    } catch (e) {
      console.warn("Failed to save profile:", e);
      Alert.alert("Error", "Unable to save profile.");
    }
  };

  const clearProfile = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setProfile({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "",
        address: "",
        avatarUri: "",
      });
      Alert.alert("Cleared", "Profile cleared.");
    } catch (e) {
      console.warn("Failed to clear profile:", e);
    }
  };

  const renderAvatar = () => {
    if (profile.avatarUri) {
      return <Image source={{ uri: profile.avatarUri }} style={styles.avatar} />;
    }
    const initials = profile.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarInitials}>{initials}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={styles.container}
    >
      <View style={styles.card}>
        {renderAvatar()}

        <View style={styles.info}>
          {editing ? (
            <>
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(t) => setProfile((p) => ({ ...p, name: t }))}
                placeholder="Full name"
                autoCapitalize="words"
              />
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(t) => setProfile((p) => ({ ...p, email: t }))}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={profile.phone}
                onChangeText={(t) => setProfile((p) => ({ ...p, phone: t }))}
                placeholder="Phone"
                keyboardType="phone-pad"
              />
              <TextInput
                style={[styles.input, styles.addressInput]}
                value={profile.address}
                onChangeText={(t) => setProfile((p) => ({ ...p, address: t }))}
                placeholder="Address"
                multiline
              />
            </>
          ) : (
            <>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.email}>{profile.email}</Text>
              {profile.phone ? <Text style={styles.meta}>{profile.phone}</Text> : null}
              {profile.address ? <Text style={styles.meta}>{profile.address}</Text> : null}
            </>
          )}
        </View>

        <View style={styles.actions}>
          {editing ? (
            <>
              <TouchableOpacity style={styles.actionBtnPrimary} onPress={saveProfile}>
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => {
                  setEditing(false);
                }}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.actionBtnPrimary}
                onPress={() => setEditing(true)}
              >
                <Text style={styles.actionText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() =>
                  Alert.alert("Logout", "Are you sure you want to logout?", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Logout", style: "destructive", onPress: clearProfile },
                  ])
                }
              >
                <Text style={styles.actionText}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Purchase Status</Text>
        <Text style={styles.footerText}>You have 0 recent purchases.</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f7f7f8",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    elevation: 2,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
    backgroundColor: "#ddd",
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
    backgroundColor: "#686D76",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  info: {
    width: "100%",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  meta: {
    fontSize: 13,
    color: "#777",
    marginTop: 6,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginTop: 8,
  },
  addressInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  actions: {
    width: "100%",
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionBtnPrimary: {
    backgroundColor: "#686D76",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  actionBtn: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
  },
  footerText: {
    color: "#666",
  },
});