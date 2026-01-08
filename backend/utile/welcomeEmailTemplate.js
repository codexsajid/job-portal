const welcomeEmailTemplate = (fullname) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif;">
  <h2>Welcome, ${fullname}! 🎉</h2>
  <p>Your account has been successfully verified.</p>
  <p>Start exploring job opportunities now!</p>
  <br/>
  <p>Best Regards,<br/>Job Portal Team</p>
</body>
</html>
`;
export default welcomeEmailTemplate;
