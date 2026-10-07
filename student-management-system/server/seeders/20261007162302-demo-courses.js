'use strict';

module.exports = {
  // The 'up' function handles inserting the data into MySQL
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [
      {
        courseName: 'Software Testing 101',
        description: 'Introduction to STLC, black-box, and white-box testing techniques.',
        credits: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseName: 'Database Management Systems',
        description: 'Learn SQL, relational schema designs, and indexing strategies.',
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseName: 'Web Application Development',
        description: 'Building full-stack JavaScript architectures using modern frameworks.',
        credits: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseName: 'Object-Oriented Programming',
        description: 'Mastering classes, inheritance, polymorphism, and encapsulation.',
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  // The 'down' function handles undoing/deleting the data if you ever need to clean the table
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
