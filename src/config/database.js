require('dotenv').config();

module.exports = {
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite', 
  
  logging: false, 
  
  define: {
    timestamps: true,
    underscored: true,
  },
};