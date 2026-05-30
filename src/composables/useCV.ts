import { ref, watch } from 'vue';
import type { CVData } from '../types/cv';

// Unique ID helper
const generateId = () => Math.random().toString(36).substring(2, 9);

// Realistic initial dummy data for outstanding visual representation
const initialDummyData = (): CVData => {
 
  const isWoman:Boolean = Math.random() > 0.5;

  const genreData = {
    name: isWoman ? 'Luna' : 'Mariano',
    email: isWoman ? 'luna.cv@example.com' : 'mariano.cv@example.com',
    website: isWoman ? 'https://github.com/luna-cv' : 'https://github.com/mariano-cv'
  };

  return {
    personalInfo: {
      firstName: genreData.name,
      lastName: 'Velasquez',
      subTitle: "",
      photo: '', // Empty initially, can be loaded or uploaded
      profile: 'Innovative and detail-oriented Senior Front-End Engineer with over 6 years of experience building responsive, highly-interactive web applications. Specializing in Vue.js, TypeScript, and modern CSS architectures to craft outstanding digital user experiences.',
      aboutMe: 'Passionate about bridging the gap between design and engineering. I thrive in collaborative environments where performance, accessibility (a11y), and state-of-the-art aesthetics are prioritized. Outside of coding, I contribute to open-source tools and design custom design systems.',
      email: genreData.email,
      phone: '+1 (555) 019-2834',
      website: genreData.website,
      address: 'San Francisco, CA'
    },
    experiences: [
      {
        id: generateId(),
        company: 'TechCraft Solutions',
        position: 'Lead Frontend Architect',
        address: 'San Francisco, CA (Remote)',
        startDate: '2023-03',
        endDate: '',
        current: true,
        responsabilities: '',
      },
      {
        id: generateId(),
        company: 'PixelPerfect Studio',
        position: 'Senior UI Developer',
        address: 'Austin, TX',
        startDate: '2020-08',
        endDate: '2023-02',
        current: false,
        responsabilities: '',
      }
    ],
    educationList: [
      {
        id: generateId(),
        school: 'University of Texas at Austin',
        career: 'Bachelor of Science in Computer Science',
        startDate: '2016-09',
        endDate: '2020-06',
        place: 'Austin, TX'
      }
    ],
    courses: [
      {
        id: generateId(),
        title: 'Advanced Vue.js & Design Patterns',
        dateEnd: '2022-11',
        provider: 'Frontend Masters',
        modality: 'virtual'
      },
      {
        id: generateId(),
        title: 'UI/UX Design Masterclass',
        dateEnd: '2021-05',
        provider: 'Interaction Design Foundation',
        modality: 'virtual'
      }
    ],
    skills: {
      soft: ['Leadership', 'Active Listening', 'Problem Solving', 'Effective Communication', 'Agile Methodology'],
      hard: ['Vue 3 / Composition API', 'TypeScript', 'Vite / Webpack', 'Tailwind CSS', 'CSS Grid & Flexbox', 'Git & CI/CD', 'State Management (Pinia)', 'Testing (Vitest/Playwright)']
    },
    languages: [
      { id: generateId(), name: 'Spanish', level: 'native' },
      { id: generateId(), name: 'English', level: 'A1' },
      { id: generateId(), name: 'French', level: 'B1' }
    ]
  };
}

const LOCAL_STORAGE_KEY = import.meta.env.LOCAL_STORAGE_KEY;

export function useCV() {
  const cvData = ref<CVData>(initialDummyData());

  // Load from local storage on init if exists
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Basic sanity check
      if (parsed && parsed.personalInfo && Array.isArray(parsed.experiences)) {
        cvData.value = parsed;
      }
    } catch (e) {
      console.error('Failed to parse stored CV data, using default', e);
    }
  }

  // Watch for changes and save to local storage
  watch(
    cvData,
    (newData) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    },
    { deep: true }
  );

  // Methods for Personal Info / Photo
  const uploadPhoto = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          cvData.value.personalInfo.photo = e.target.result;
          resolve();
        } else {
          reject(new Error('Failed to read file as base64 string'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = () => {
    cvData.value.personalInfo.photo = '';
  };

  // Methods for Experience
  const addExperience = () => {
    cvData.value.experiences.push({
      id: generateId(),
      company: '',
      position: '',
      address: '',
      startDate: '',
      endDate: '',
      current: false,
      responsabilities: '',
    });
  };

  const removeExperience = (id: string) => {
    cvData.value.experiences = cvData.value.experiences.filter(exp => exp.id !== id);
  };

  // Mark one experience as current; clear all others and reset their endDate if needed
  const setCurrentExperience = (id: string) => {
    cvData.value.experiences.forEach(exp => {
      if (exp.id === id) {
        exp.current = true;
        exp.endDate = '';
      } else {
        exp.current = false;
      }
    });
  };

  // Methods for Education: Formal & Courses
  const addFormalEducation = () => {
    cvData.value.educationList.push({
      id: generateId(),
      school: '',
      career: '',
      startDate: '',
      endDate: '',
      place: ''
    });
  };

  const removeFormalEducation = (id: string) => {
    cvData.value.educationList = cvData.value.educationList.filter(edu => edu.id !== id);
  };

  const addCourse = () => {
    cvData.value.courses.push({
      id: generateId(),
      title: '',
      dateEnd: '',
      provider: '',
      modality: 'virtual'
    });
  };

  const removeCourse = (id: string) => {
    cvData.value.courses = cvData.value.courses.filter(course => course.id !== id);
  };

  // Methods for Skills (Soft & Hard)
  const addSkill = (type: 'soft' | 'hard', skillName: string) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;
    
    // Check for duplicates
    if (!cvData.value.skills[type].includes(trimmed)) {
      cvData.value.skills[type].push(trimmed);
    }
  };

  const removeSkill = (type: 'soft' | 'hard', index: number) => {
    cvData.value.skills[type].splice(index, 1);
  };

  // Methods for Languages
  const addLanguage = () => {
    // If it's the very first language, set it as native, else B1
    const level = cvData.value.languages.length === 0 ? 'native' : 'B1';
    cvData.value.languages.push({
      id: generateId(),
      name: '',
      level
    });
  };

  const removeLanguage = (id: string) => {
    cvData.value.languages = cvData.value.languages.filter(lang => lang.id !== id);
  };

  const setNativeLanguage = (id: string) => {
    cvData.value.languages.forEach(lang => {
      if (lang.id === id) {
        lang.level = 'native';
      } else if (lang.level === 'native') {
        // Demote existing native to C2 or let user change
        lang.level = 'C2';
      }
    });
  };

  // Reset to initial visual dummy data
  const resetToDummy = () => {
    cvData.value = initialDummyData();
  };

  // Clear all data fields
  const clearAll = () => {
    cvData.value = {
      personalInfo: {
        firstName: '',
        lastName: '',
        subTitle: '',
        photo: '',
        profile: '',
        aboutMe: '',
        email: '',
        phone: '',
        website: '',
        address: ''
      },
      experiences: [],
      courses: [],
      educationList: [],
      skills: {
        soft: [],
        hard: []
      },
      languages: []
    };
  };

  // Export data as JSON file
  const exportJSON = () => {
    const dataStr = JSON.stringify(cvData.value, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    const filename = `${cvData.value.personalInfo.firstName || 'craft'}_${cvData.value.personalInfo.lastName || 'vitae'}_cv.json`.toLowerCase();
    link.href = url;
    link.download = filename;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  // Import data from JSON file
  const importJSONFile = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          if (e.target?.result && typeof e.target.result === 'string') {
            const parsed = JSON.parse(e.target.result);
            // Basic structure validation
            if (parsed && typeof parsed === 'object') {
              if (!parsed.personalInfo) parsed.personalInfo = { firstName: '', lastName: '', photo: '', profile: '', aboutMe: '' };
              if (!parsed.experiences) parsed.experiences = [];
              if (!parsed.courses) parsed.courses = [];
              if (!parsed.educationList) parsed.educationList = [];
              if (!parsed.skills) parsed.skills = { soft: [], hard: [] };
              if (!parsed.skills.soft) parsed.skills.soft = [];
              if (!parsed.skills.hard) parsed.skills.hard = [];
              if (!parsed.languages) parsed.languages = [];
              
              cvData.value = parsed;
              resolve();
            } else {
              reject(new Error('Invalid JSON format for CV data'));
            }
          } else {
            reject(new Error('Could not read the JSON file content'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  return {
    cvData,
    uploadPhoto,
    removePhoto,
    addExperience,
    removeExperience,
    setCurrentExperience,
    addFormalEducation,
    removeFormalEducation,
    addCourse,
    removeCourse,
    addSkill,
    removeSkill,
    addLanguage,
    removeLanguage,
    setNativeLanguage,
    resetToDummy,
    clearAll,
    exportJSON,
    importJSONFile
  };
}
