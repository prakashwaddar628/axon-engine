import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottom: '1px solid #eee',
    paddingBottom: 2,
  },
  project: {
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  projectTech: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  projectDesc: {
    fontSize: 10,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  projectImpact: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#444',
  },
  skills: {
    fontSize: 10,
    marginTop: 5,
    lineHeight: 1.5,
  },
});

interface ResumeData {
  selected_projects: Array<{
    name: string;
    description: string;
    techStack: string[];
    impact: string;
  }>;
  summary: string;
  master_profile: {
      name: string;
      skills: string[];
  }
}

export const ResumeDocument = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.master_profile.name}</Text>
        <Text style={styles.role}>Senior AI Engineer / Full-Stack Developer</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Summary</Text>
        <Text style={{ fontSize: 10, lineHeight: 1.4 }}>{data.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Relevant Projects</Text>
        {data.selected_projects.map((project, index) => (
          <View key={index} style={styles.project}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectName}>{project.name}</Text>
            </View>
            <Text style={styles.projectTech}>{project.techStack.join(' • ')}</Text>
            <Text style={styles.projectDesc}>{project.description}</Text>
            <Text style={styles.projectImpact}>Impact: {project.impact}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <Text style={styles.skills}>
          {data.master_profile.skills.join(' • ')}
        </Text>
      </View>
    </Page>
  </Document>
);
