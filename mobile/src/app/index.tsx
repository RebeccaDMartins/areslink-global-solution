import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [mission, setMission] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://192.168.18.85:3000/mission")
      .then((response) => {
        setMission(response.data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AresLink 🚀</Text>

      {mission && (
        <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dia da Missão</Text>
            <Text style={styles.cardValue}>{mission.missionDay}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Status</Text>
            <Text style={styles.cardValue}>{mission.status}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Oxigênio</Text>
            <Text style={styles.cardValue}>{mission.oxygen}%</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Água</Text>
            <Text style={styles.cardValue}>{mission.water}%</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Energia</Text>
            <Text style={styles.cardValue}>{mission.energy}%</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1120",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1b2438",
    width: "90%",
    padding: 20,
    borderRadius: 12,
    marginTop: 15,
  },

  cardTitle: {
    color: "#9ca3af",
    fontSize: 14,
  },

  cardValue: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
});