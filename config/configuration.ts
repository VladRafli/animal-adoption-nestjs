export default () => ({
  jwt_secret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT, 10) || 5000,
});
