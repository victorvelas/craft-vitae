export interface PersonalInfo {
  firstName: string;
  lastName: string;
  subTitle: string;
  photo: string; // Base64 Data URI
  profile: string; // Professional profile (textarea)
  aboutMe: string; // About me text
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  address: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM
  current: boolean; // Is current position
}

export interface Course {
  id: string;
  title: string;
  dateEnd: string; // YYYY-MM
  provider: string; // School/Institute
  modality: 'presential' | 'virtual';
}

export interface FormalEducation {
  id: string;
  school: string;
  career: string; // Career/Degree name
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM
  place: string; // Location
}

export interface Language {
  id: string;
  name: string;
  level: 'native' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  courses: Course[];
  educationList: FormalEducation[];
  skills: {
    soft: string[];
    hard: string[];
  };
  languages: Language[];
}
