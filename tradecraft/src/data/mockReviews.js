export const initialReviewsData = {
  summary: {
    teachingRating: 4.6,
    learningRating: 4.9,
    totalReviews: 28,
    starDistribution: {
      5: 20,
      4: 6,
      3: 1,
      2: 1,
      1: 0,
    },
  },
  reviewsReceived: [
    {
      id: 'rev-rec-1',
      reviewerName: 'Rishabh',
      skill: 'React',
      rating: 5,
      comment: 'Super clear explanations on state management and hooks. Made complex concepts feel simple!',
      date: '18 Aug 2026',
    },
    {
      id: 'rev-rec-2',
      reviewerName: 'Nishant Lal',
      skill: 'Data Structures & Algorithms',
      rating: 5,
      comment: 'Great problem-solving session on graph algorithms. Very patient and articulate teacher.',
      date: '14 Aug 2026',
    },
    {
      id: 'rev-rec-3',
      reviewerName: 'Aditya Patyal',
      skill: 'Python',
      rating: 4,
      comment: 'Helpful walkthrough of automation scripts. Provided solid examples and practice exercises.',
      date: '08 Aug 2026',
    },
    {
      id: 'rev-rec-4',
      reviewerName: 'Shirshak',
      skill: 'JavaScript',
      rating: 5,
      comment: 'Brilliant hands-on session covering async/await and event loop. Highly recommended!',
      date: '02 Aug 2026',
    },
    {
      id: 'rev-rec-5',
      reviewerName: 'Priya Sharma',
      skill: 'React',
      rating: 4,
      comment: 'Very interactive session on building reusable components. Looking forward to the next one.',
      date: '28 Jul 2026',
    },
  ],
  reviewsGiven: [
    {
      id: 'rev-giv-1',
      teacherName: 'Shirshak',
      skill: 'Guitar',
      rating: 5,
      comment: 'Learned chord progressions and fingerpicking techniques in just two sessions. Fantastic teacher!',
      date: '16 Aug 2026',
    },
    {
      id: 'rev-giv-2',
      teacherName: 'Nishant Lal',
      skill: 'UI/UX',
      rating: 5,
      comment: 'Gave actionable feedback on wireframes and Figma auto-layout. Really leveled up my design sense.',
      date: '11 Aug 2026',
    },
    {
      id: 'rev-giv-3',
      teacherName: 'Aditya Patyal',
      skill: 'Cybersecurity',
      rating: 4,
      comment: 'Very insightful intro to network security fundamentals and hands-on packet inspection tools.',
      date: '05 Aug 2026',
    },
    {
      id: 'rev-giv-4',
      teacherName: 'Rishabh',
      skill: 'Node.js',
      rating: 5,
      comment: 'Deep dive into REST API architectures and middleware chaining. Extremely well structured!',
      date: '25 Jul 2026',
    },
  ],
  completedSessions: [
    {
      id: 'sess-1',
      teacherName: 'Aditya Patyal',
      skill: 'Public Speaking',
    },
    {
      id: 'sess-2',
      teacherName: 'Nishant Lal',
      skill: 'Photography',
    },
    {
      id: 'sess-3',
      teacherName: 'Shirshak',
      skill: 'Music Production',
    },
  ],
}

export default initialReviewsData
