import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin Cez',
    email: 'admin@email.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true,
  },
  {
    name: 'cez bel',
    email: 'cez@email.com',
    password: bcrypt.hashSync('123', 10),
    isAdmin: false,
  },
  {
    name: 'john doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('123', 10),
    isAdmin: false,
  },
];

export default users;