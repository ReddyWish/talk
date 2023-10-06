import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    avatar: '/images/admin.jpg',
    password: bcrypt.hashSync('zaq123ZAQ$', 10),
    isAdmin: true,
    country: 'USA',
    profession: 'Product Manager',
    description: 'More then 20 years of experience, always open for new projects'
  },  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('zaq123ZAQ$', 10),
    isAdmin: false,
    country: 'USA',
    profession: 'Web Developer',
    description: 'MERN stack developer, 10 years of experience'
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    avatar: '/images/jane.jpg',
    password: bcrypt.hashSync('zaq123ZAQ$', 10),
    isAdmin: false,
    profession: 'Designer',
    description: 'Design is not just what it looks like and feels like. Design is how it works.'
  }
];

export default users;

