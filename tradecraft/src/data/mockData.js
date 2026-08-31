export const campuses = [
  { id: 'Punjab', name: 'Chitkara Punjab' },
  { id: 'Himachal', name: 'Chitkara Himachal' },
]

export const categories = [
  {
    id: 'academic',
    name: 'Academic',
    skills: ['Discrete-Mathematics', 'Computer Organization', 'Operating-Systems', 'Programming', 'Data Structures & Algorithms'],
  },
  {
    id: 'technology',
    name: 'Technology',
    skills: ['Web Development', 'App Development', 'Cybersecurity', 'AI / ML', 'Cloud development', 'Git/GitHub'],
  },
  {
    id: 'creative',
    name: 'Creative',
    skills: ['Graphic Design', 'UI/UX', 'Photography', 'Video Editing', 'Drawing'],
  },
  {
    id: 'co-curricular',
    name: 'Co-curricular Activites',
    skills: ['Guitar', 'Singing', 'Dance', 'Theatre', 'Music Production'],
  },
  {
    id: 'sports-fitness',
    name: 'Sports & Fitness',
    skills: ['Cricket', 'Football', 'Basketball', 'Fitness', 'Yoga'],
  },
  {
    id: 'professional',
    name: 'Professional',
    skills: ['Public Speaking', 'Communication', 'Leadership', 'Interview Preparation', 'Resume Building'],
  },
]

export const skills = [
  { id: 'react', name: 'React', category: 'technology', description: 'A JavaScript library for building user interfaces, especially interactive websites.' },
  { id: 'javascript', name: 'JavaScript', category: 'technology', description: 'Core language of the web — logic, DOM, and async programming.' },
  { id: 'nodejs', name: 'Node.js', category: 'technology', description: 'Server-side JavaScript runtime for APIs and backend services.' },
  { id: 'python', name: 'Python', category: 'academic', description: 'Versatile language for scripting, data, and automation.' },
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'technology', description: 'Protecting systems, networks, and data from threats.' },
  { id: 'guitar', name: 'Guitar', category: 'co-curricular', description: 'Learn chords, rhythm, and songs on acoustic or electric guitar.' },
  { id: 'uiux', name: 'UI/UX', category: 'creative', description: 'Design interfaces that are usable, clear, and intentional.' },
  { id: 'public-speaking', name: 'Public Speaking', category: 'professional', description: 'Present ideas confidently in front of an audience.' },
  { id: 'photography', name: 'Photography', category: 'creative', description: 'Composition, lighting, and editing for better photos.' },
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'academic', description: 'Problem-solving foundations for technical interviews.' },
]

export const students = [
  {
    id: 'rishabh',
    name: 'Rishabh',
    campus: 'punjab',
    department: 'Computer Science',
    year: '2nd Year',
    bio: 'Backend Oriented Developer with a lot of room to develop',
    avatar: null,
    teachingRating: 4.9,
    learningRating: 4.6,
    teaches: ['React', 'JavaScript', 'Node.js','Data Structures & Algorithms'],
    learning: ['UI/UX', 'Photography'],
    teachingSessions: 24,
    learningSessions: 8,
    teachingModes: ['Google Meet', 'In person'],
    availability: ['Mon 4–6 PM', 'Wed 5–7 PM', 'Sat 10 AM–1 PM'],
  },
  {
    id: 'nishant',
    name: 'Nishant Lal',
    campus: 'punjab',
    department: 'Computer Science',
    year: '2nd Year',
    bio: 'CSE student who codes hard, stays sharper, and naturally mogs the competition.',
    avatar: null,
    teachingRating: 4.7,
    learningRating: 4.8,
    teaches: ['UI/UX', 'Graphic Design', 'Photography'],
    learning: ['React', 'Public Speaking'],
    teachingSessions: 18,
    learningSessions: 12,
    teachingModes: ['Google Meet', 'Zoom', 'In person'],
    availability: ['Tue 3–5 PM', 'Thu 4–6 PM'],
  },
  {
    id: 'aditya',
    name: 'Aditya patyal',
    campus: 'punjab',
    department: 'Computer Science',
    year: '2nd Year',
    bio: 'CSE student, currently specializing in being a CSE student.',
    avatar: null,
    teachingRating: 4.8,
    learningRating: 4.3,
    teaches: ['Cybersecurity', 'Linux', 'Python'],
    learning: ['Public Speaking'],
    teachingSessions: 1,
    learningSessions: 5,
    teachingModes: ['Google Meet', 'Live chat'],
    availability: ['Mon 6–8 PM', 'Fri 5–7 PM'],
  },
  {
    id: 'shirshak',
    name: 'Shirshak',
    campus: 'punjab',
    department: 'Computer Science',
    year: '2nd Year',
    bio: 'CSE student who enjoys turning problems into solutions.',
    avatar: null,
    teachingRating: 4.6,
    learningRating: 4.9,
    teaches: ['Guitar', 'Music Production'],
    learning: ['JavaScript', 'Video Editing'],
    teachingSessions: 5,
    learningSessions: 9,
    teachingModes: ['In person', 'Google Meet'],
    availability: ['Wed 4–6 PM', 'Sun 11 AM–2 PM'],
  },
]

const today = new Date()
const dayNumber=Math.floor(today.getTime()/(1000*60*60*24))
export const skillOfTheDay = skills[dayNumber % skills.length]
export const discoverSkills = ['Cybersecurity', 'Guitar', 'UI/UX', 'Public Speaking', 'Photography', 'Python']

export const campusActivity = {
  popular: [
    { skill: 'React', teachers: 8, learners: 14 },
    { skill: 'Python', teachers: 6, learners: 11 },
    { skill: 'Public Speaking', teachers: 5, learners: 9 },
  ],
  recentlyAdded: ['Music Production', 'Cybersecurity', 'Yoga'],
}

export const mySkills = {
  teaches: ['React', 'Java', 'Data Structures & Algorithms'],
  learning: ['Photography', 'UI/UX', 'Guitar'],
}

export const bookings = {
  upcoming: [
    {
      id: 'b1',
      skill: 'React',
      teacher: 'Rishabh',
      teacherId: 'rishabh',
      mode: 'Google Meet',
      date: '24 Aug 2026',
      time: '5:00 PM',
      status: 'confirmed',
    },
  ],
  pending: [
    {
      id: 'b2',
      skill: 'Photography',
      teacher: 'Nishant Lal',
      teacherId: 'nishant',
      mode: 'In person',
      date: '26 Aug 2026',
      time: '4:00 PM',
      status: 'pending',
    },
  ],
  completed: [
    {
      id: 'b3',
      skill: 'Public Speaking',
      teacher: 'Aditya patyal',
      teacherId: 'aditya',
      mode: 'Google Meet',
      date: '10 Aug 2026',
      time: '6:00 PM',
      status: 'completed',
    },
  ],
}

export function getStudentsBySkill(skillName, campusId) {
  return students
    .filter(
      (s) =>
        s.campus === campusId &&
        s.teaches.some((t) => t.toLowerCase() === skillName.toLowerCase())
    )
    .sort((a, b) => b.teachingRating - a.teachingRating)
}

export function getStudentById(id) {
  return students.find((s) => s.id === id)
}

export function searchAll(query, campusId) {
  const q = query.toLowerCase().trim()
  if (!q) return { skills: ["No skill found "], students: ["No student found"] }

  const matchedSkills = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      categories
        .find((c) => c.id === s.category)
        ?.name.toLowerCase()
        .includes(q)
  )

  const matchedStudents = students.filter(
    (s) =>
      s.campus === campusId &&
      (s.name.toLowerCase().includes(q) ||
        s.teaches.some((t) => t.toLowerCase().includes(q)) ||
        s.learning.some((l) => l.toLowerCase().includes(q)))
  )

  return { skills: matchedSkills, students: matchedStudents }
}

export function getCategoryById(id) {
  return categories.find((c) => c.id === id)
}

export function getSkillByName(name) {
  return skills.find((s) => s.name.toLowerCase() === name.toLowerCase())
}
