export const campuses = [
  { id: 'Punjab', name: 'Chitkara Punjab' },
  { id: 'Himachal', name: 'Chitkara Himachal' },
]

export const categories = [
  {
    id: 'academic',
    name: 'Academic',
    skills: [
      'Discrete Mathematics',
      'Computer Organization',
      'Operating Systems',
      'Programming',
      'Data Structures & Algorithms',
    ],
  },
  {
    id: 'technology',
    name: 'Technology',
    skills: ['Web Development', 'App Development', 'Cybersecurity', 'AI / ML', 'Cloud Development', 'Git/GitHub'],
  },
  {
    id: 'creative',
    name: 'Creative',
    skills: ['Graphic Design', 'UI/UX', 'Photography', 'Video Editing', 'Drawing'],
  },
  {
    id: 'co-curricular',
    name: 'Co-curricular Activities',
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
  { id: 'react', name: 'React', category: 'technology', description: 'A JavaScript library for building interactive user interfaces.' },
  { id: 'javascript', name: 'JavaScript', category: 'technology', description: 'The core language of the web — logic, DOM and async programming.' },
  { id: 'nodejs', name: 'Node.js', category: 'technology', description: 'A server-side JavaScript runtime used to build APIs and backend services.' },
  { id: 'python', name: 'Python', category: 'academic', description: 'A versatile language used for scripting, data and automation.' },
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'technology', description: 'Protecting systems, networks and data from security threats.' },
  { id: 'guitar', name: 'Guitar', category: 'co-curricular', description: 'Learn chords, rhythm and songs on acoustic or electric guitar.' },
  { id: 'uiux', name: 'UI/UX', category: 'creative', description: 'Designing interfaces that are usable, clear and intentional.' },
  { id: 'public-speaking', name: 'Public Speaking', category: 'professional', description: 'Presenting ideas confidently in front of an audience.' },
  { id: 'photography', name: 'Photography', category: 'creative', description: 'Composition, lighting and editing for better photographs.' },
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'academic', description: 'Problem-solving foundations used in technical interviews.' },
]

export const students = [
  {
    id: 'rishabh',
    name: 'Rishabh',
    campus: 'Punjab',
    department: 'Computer Science',
    year: '2nd Year',
    bio: 'Backend oriented developer who enjoys building things from scratch.',
    teachingRating: 4.9,
    learningRating: 4.6,
    teaches: ['React', 'JavaScript', 'Node.js', 'Data Structures & Algorithms'],
    learning: ['UI/UX', 'Photography'],
    teachingSessions: 24,
    learningSessions: 8,
    teachingModes: ['Google Meet', 'In person'],
    availability: ['Mon 4-6 PM', 'Wed 5-7 PM', 'Sat 10 AM-1 PM'],
  },
  {
    id: 'nishant',
    name: 'Nishant Lal',
    campus: 'Punjab',
    department: 'Computer Science',
    year: '2nd Year',
    bio: 'Design-minded developer who splits time between code and creative work.',
    teachingRating: 4.7,
    learningRating: 4.8,
    teaches: ['UI/UX', 'Graphic Design', 'Photography'],
    learning: ['React', 'Public Speaking'],
    teachingSessions: 18,
    learningSessions: 12,
    teachingModes: ['Google Meet', 'Zoom', 'In person'],
    availability: ['Tue 3-5 PM', 'Thu 4-6 PM'],
  },
  {
    id: 'aditya',
    name: 'Aditya Patyal',
    campus: 'Punjab',
    department: 'Computer Science',
    year: '2nd Year',
    bio: 'Security enthusiast who spends most evenings exploring Linux and networks.',
    teachingRating: 4.8,
    learningRating: 4.3,
    teaches: ['Cybersecurity', 'Linux', 'Python'],
    learning: ['Public Speaking'],
    teachingSessions: 11,
    learningSessions: 5,
    teachingModes: ['Google Meet', 'Live chat'],
    availability: ['Mon 6-8 PM', 'Fri 5-7 PM'],
  },
  {
    id: 'rohan',
    name: 'Rohan Sharma',
    campus: 'Punjab',
    department: 'Computer Science',
    year: '2nd Year',
    bio: 'Music producer and guitarist who also enjoys solving programming problems.',
    teachingRating: 4.6,
    learningRating: 4.9,
    teaches: ['Guitar', 'Music Production'],
    learning: ['JavaScript', 'Video Editing'],
    teachingSessions: 15,
    learningSessions: 9,
    teachingModes: ['In person', 'Google Meet'],
    availability: ['Wed 4-6 PM', 'Sun 11 AM-2 PM'],
  },
  {
    id: 'meera',
    name: 'Meera Joshi',
    campus: 'Himachal',
    department: 'Design',
    year: '3rd Year',
    bio: 'Product designer who loves teaching interface fundamentals.',
    teachingRating: 4.8,
    learningRating: 4.5,
    teaches: ['UI/UX', 'Graphic Design', 'Drawing'],
    learning: ['React', 'Photography'],
    teachingSessions: 21,
    learningSessions: 7,
    teachingModes: ['Google Meet', 'In person'],
    availability: ['Tue 5-7 PM', 'Sat 11 AM-1 PM'],
  },
  {
    id: 'karan',
    name: 'Karan Verma',
    campus: 'Himachal',
    department: 'Computer Science',
    year: '2nd Year',
    bio: 'Front-end developer learning in public and sharing whatever he picks up.',
    teachingRating: 4.5,
    learningRating: 4.7,
    teaches: ['Web Development', 'JavaScript', 'Git/GitHub'],
    learning: ['Node.js', 'Public Speaking'],
    teachingSessions: 9,
    learningSessions: 10,
    teachingModes: ['Google Meet', 'Live chat'],
    availability: ['Mon 3-5 PM', 'Thu 6-8 PM'],
  },
]

export const discoverSkills = ['Cybersecurity', 'Guitar', 'UI/UX', 'Public Speaking', 'Photography', 'Python']

export const campusActivity = {
  popular: [
    { skill: 'React', teachers: 8, learners: 14 },
    { skill: 'Python', teachers: 6, learners: 11 },
    { skill: 'Public Speaking', teachers: 5, learners: 9 },
  ],
  recentlyAdded: ['Music Production', 'Cybersecurity', 'Yoga'],
}

export const initialMySkills = {
  teaches: ['React', 'Java', 'Data Structures & Algorithms'],
  learning: ['Photography', 'UI/UX', 'Guitar'],
}

export const initialBookings = {
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
      teacher: 'Aditya Patyal',
      teacherId: 'aditya',
      mode: 'Google Meet',
      date: '10 Aug 2026',
      time: '6:00 PM',
      status: 'completed',
    },
  ],
}

export function getCampusById(id) {
  return campuses.find((campus) => campus.id === id) || campuses[0]
}

export function getCategoryById(id) {
  return categories.find((category) => category.id === id)
}

export function getStudentById(id) {
  return students.find((student) => student.id === id)
}

export function getSkillByName(name) {
  return skills.find((skill) => skill.name.toLowerCase() === name.toLowerCase())
}

export function getStudentsBySkill(skillName, campusId) {
  return students
    .filter(
      (student) =>
        student.campus === campusId &&
        student.teaches.some((skill) => skill.toLowerCase() === skillName.toLowerCase())
    )
    .sort((a, b) => b.teachingRating - a.teachingRating)
}

function searchAll(query, campusId) {
  const q = query.toLowerCase().trim()
  if (!q) return { skills: [], students: [] }

  const matchedSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(q) ||
      (categories.find((category) => category.id === skill.category)?.name.toLowerCase().includes(q) ?? false)
  )

  const matchedStudents = students.filter(
    (student) =>
      student.campus === campusId &&
      (student.name.toLowerCase().includes(q) ||
        student.teaches.some((skill) => skill.toLowerCase().includes(q)) ||
        student.learning.some((skill) => skill.toLowerCase().includes(q)))
  )

  return { skills: matchedSkills, students: matchedStudents }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchHomeData() {
  await delay(500)
  const dayNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  return {
    skillOfTheDay: skills[dayNumber % skills.length],
    discoverSkills,
    campusActivity,
  }
}

export async function fetchCategories() {
  await delay(400)
  return categories
}

export async function fetchCategory(id) {
  await delay(400)
  return getCategoryById(id) || null
}

export async function fetchSkillPage(skillName, campusId) {
  await delay(500)
  return {
    skill: getSkillByName(skillName) || null,
    teachers: getStudentsBySkill(skillName, campusId),
  }
}

export async function fetchStudent(id) {
  await delay(400)
  return getStudentById(id) || null
}

export async function fetchSearchResults(query, campusId) {
  await delay(500)
  const { skills: matchedSkills, students: matchedStudents } = searchAll(query, campusId)
  return {
    skills: matchedSkills,
    students: matchedStudents,
    teachers: getStudentsBySkill(query, campusId),
  }
}
