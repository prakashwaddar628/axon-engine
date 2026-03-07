import masterProfile from './master-profile.json';

export type Project = {
  name: string;
  description: string;
  techStack: string[];
  impact: string;
};

export type MasterProfile = {
  name: string;
  projects: Project[];
  skills: string[];
};

export const getMasterProfile = () => masterProfile;
export default masterProfile;
