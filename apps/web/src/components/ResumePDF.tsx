import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 11 },
  header: { borderBottom: "1px solid #000", pb: 10, mb: 10 },
  name: { fontSize: 24, fontWeight: "bold", textTransform: "uppercase" },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    borderBottom: "1px solid #eee",
  },
  bullet: { marginBottom: 5, paddingLeft: 10 },
});

export const ResumePDF = ({ tailoredContent }: { tailoredContent: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>Your Name</Text>
        <Text>AI & Data Science Student | GitHub: youruser</Text>
      </View>

      <Text style={styles.sectionTitle}>Key Projects</Text>
      <View style={styles.bullet}>
        <Text>{tailoredContent}</Text>
      </View>
    </Page>
  </Document>
);
