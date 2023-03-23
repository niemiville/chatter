export const config = {
  HOST: "localhost",
  USER: "myusername",
  PASSWORD: "mypassword",
  DB: "chatter",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};