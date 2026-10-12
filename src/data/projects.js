const projects = [
  {
    id: 5,
    tag: 'SaaS · Full-Stack',
    title: 'Teby\nClinic Management',
    description:
      'A clinic management SaaS for doctors: patient records, visits and installment payments, online booking with auto-generated slots, and printable prescriptions with PDF/Word export. Bilingual Arabic/English.',
    tech: ['React', 'Laravel 13', 'PHP 8.3', 'MySQL', 'Sanctum', 'TanStack Query', 'Tailwind', 'i18next'],
    link: 'https://github.com/thomas-774/clinic-management',
    linkLabel: 'View on GitHub',
    liveLink: 'https://teby-demo.vercel.app/login',
    liveLabel: 'Live Demo',
    media: { type: 'video', src: '/promo-video-ar.mp4', poster: '/posters/promo-video-ar.webp' }
  },
  {
    id: 2,
    tag: 'Web Application',
    title: 'Rove\nRide Booking',
    description:
      'A ride-booking platform inspired by Uber featuring user authentication, ride management, RESTful API architecture, responsive React UI, and MongoDB database integration.',
    tech: ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    link: 'https://github.com/thomas-774/rove',
    linkLabel: 'View on GitHub',
    liveLink: null,
    liveLabel: 'Live Demo',
    media: { type: 'video', src: '/rove.mp4', poster: '/posters/rove.webp' }
  },
  {
    id: 1,
    tag: 'Web Application',
    title: 'Movie Web\nApplication',
    description:
      'A movie web application that consumes a third-party API to fetch and display movie data. Features real-time search functionality and a favorites system for managing preferred films.',
    tech: ['JavaScript', 'React.js', 'HTML/CSS', 'REST API'],
    link: 'https://github.com/thomas-774/movieWeb',
    linkLabel: 'View on GitHub',
    liveLink: 'https://move-list.netlify.app/',
    liveLabel: 'Live Demo',
    media: { type: 'video', src: '/movie.mp4', poster: '/posters/movie.webp' }
  },
  {
    id: 3,
    tag: 'Web Application',
    title: 'GPA\nCalculator',
    description:
      'A GPA calculator supporting both mark-based and letter-grade GPA computation. Features automatic mark-to-grade conversion and a clean, intuitive interface for students.',
    tech: ['JavaScript', 'HTML', 'CSS', 'Algorithms'],
    link: 'https://github.com/thomas-774/GPA-CAL-V2',
    linkLabel: 'View on GitHub',
    liveLink: 'https://precious-bonbon-e4dec0.netlify.app/',
    liveLabel: 'Live Demo',
    media: { type: 'video', src: '/GPA.mp4', poster: '/posters/GPA.webp' }
  },
  {
    id: 4,
    tag: 'Desktop App',
    title: 'E-Commerce\nSystem',
    description:
      'A full online shopping platform built in C++ with product browsing, cart management, and order processing capabilities. Demonstrates OOP principles and data structure mastery.',
    tech: ['C++', 'OOP', 'Data Structures', 'Algorithms'],
    link: 'https://github.com/thomas-774?tab=repositories',
    linkLabel: 'View Projects',
    liveLink: null,
    liveLabel: 'Live Demo',
    media: { type: 'image', src: '/e-commerce.webp', alt: 'E-Commerce System' }
  }
]

export default projects
