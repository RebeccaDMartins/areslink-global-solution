import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

import logo from "../assets/logo.png";

export default function HomeScreen() {
  const [mission, setMission] = useState<any>(null);
  const [activeCard, setActiveCard] = useState("");

  useEffect(() => {
    axios
      .get("https://areslink-backend.onrender.com/mission")
      .then((response) => {
        setMission(response.data);
      });
  }, []);

  const renderProgressCard = (id: string, label: string, value: number) => (
    <Pressable
      onPress={() => setActiveCard(id)}
      style={[
        styles.card,
        activeCard === id && styles.activeCard,
      ]}
    >
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}%</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${value}%` }]} />
      </View>

      {activeCard === id && (
        <Text style={styles.cardHint}>Indicador selecionado</Text>
      )}
    </Pressable>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.eyebrow}>Centro de Controle Mobile</Text>
      <Text style={styles.title}>Dashboard da Missão</Text>

      <Text style={styles.description}>
        Monitoramento dos principais indicadores operacionais da missão AresLink.
      </Text>

      {mission && (
        <View style={styles.cards}>
          <Pressable
            onPress={() => setActiveCard("missionDay")}
            style={[
              styles.highlightCard,
              activeCard === "missionDay" && styles.activeCard,
            ]}
          >
            <Text style={styles.cardLabel}>Dia da Missão</Text>
            <Text style={styles.highlightValue}>{mission.missionDay}</Text>

            {activeCard === "missionDay" && (
              <Text style={styles.cardHint}>Ciclo operacional atual</Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => setActiveCard("status")}
            style={[
              styles.statusCard,
              activeCard === "status" && styles.activeCard,
            ]}
          >
            <Text style={styles.cardLabel}>Status Operacional</Text>
            <Text style={styles.statusValue}>{mission.status}</Text>

            {activeCard === "status" && (
              <Text style={styles.cardHint}>Sistema em monitoramento</Text>
            )}
          </Pressable>

          {renderProgressCard("oxygen", "O₂ • Oxigênio", mission.oxygen)}
          {renderProgressCard("water", "H₂O • Água", mission.water)}
          {renderProgressCard("energy", "⚡ Energia", mission.energy)}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#0b1120",
    padding: 24,
    alignItems: "center",
  },

  logo: {
    width: 190,
    height: 80,
    marginTop: 24,
    marginBottom: 18,
  },

  eyebrow: {
    color: "#38bdf8",
    textTransform: "uppercase",
    letterSpacing: 3,
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center",
  },

  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },

  description: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 14,
    marginBottom: 26,
    maxWidth: 520,
  },

  cards: {
    width: "100%",
    maxWidth: 720,
    gap: 14,
  },

  highlightCard: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#38bdf8",
    borderRadius: 18,
    padding: 22,
  },

  statusCard: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 18,
    padding: 22,
  },

  card: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#243047",
    borderRadius: 18,
    padding: 22,
  },

  activeCard: {
    borderColor: "#38bdf8",
    backgroundColor: "#132033",
  },

  cardLabel: {
    color: "#94a3b8",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 8,
    fontWeight: "700",
  },

  highlightValue: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "bold",
  },

  cardValue: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },

  statusValue: {
    color: "#22c55e",
    fontSize: 28,
    fontWeight: "bold",
  },

  progressBar: {
    height: 8,
    backgroundColor: "#1e293b",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 14,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#38bdf8",
    borderRadius: 999,
  },

  cardHint: {
    color: "#38bdf8",
    marginTop: 12,
    fontSize: 13,
    fontWeight: "700",
  },
});