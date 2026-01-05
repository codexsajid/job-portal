

const htmlBody = (name) => {
    return (
        `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome back to Job Portal!</h2>
    <p>Hello <strong>${name}</strong>,</p>
    <p>You have successfully signed in to your Job Portal account.</p>
    <ul>
      <li>Explore the latest job opportunities tailored to your profile</li>
      <li>Track your applications in real time</li>
      <li>Update your resume and profile to stand out to recruiters</li>
    </ul>
    <p>We’re excited to help you take the next step in your career journey.</p>
    <p style="color: red;">If this wasn’t you, please secure your account immediately by resetting your password.</p>
    <p>Best regards,<br/>The Job Portal Team</p>
  </body>
</html>`
    )
}

export default htmlBody