const forgotPasswordOtpTemplate = (fullname, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset OTP</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #007bff;
      padding-bottom: 20px;
    }
    .title {
      color: #007bff;
      font-size: 24px;
      font-weight: bold;
      margin: 0;
    }
    .content {
      color: #333;
      line-height: 1.6;
      font-size: 14px;
    }
    .greeting {
      font-weight: 600;
      margin-bottom: 15px;
    }
    .otp-box {
      background-color: #e7f3ff;
      border: 2px solid #007bff;
      padding: 20px;
      border-radius: 6px;
      text-align: center;
      margin: 25px 0;
    }
    .otp-label {
      font-size: 12px;
      color: #666;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .otp-code {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 4px;
      color: #d32f2f;
      font-family: 'Courier New', monospace;
      margin: 10px 0;
    }
    .otp-validity {
      font-size: 12px;
      color: #d32f2f;
      font-weight: 600;
      margin-top: 8px;
    }
    .note {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 12px;
      margin: 20px 0;
      border-radius: 4px;
      font-size: 13px;
      color: #856404;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">🔐 Password Reset OTP</h1>
    </div>

    <div class="content">
      <p class="greeting">Hello ${fullname},</p>
      
      <p>We received a request to reset your password. Use the OTP code below to proceed:</p>
      
      <div class="otp-box">
        <div class="otp-label">Your OTP Code</div>
        <div class="otp-code">${otp}</div>
        <div class="otp-validity">Valid for 5 minutes</div>
      </div>

      <div class="note">
        <strong>⚠️ Security Alert:</strong> Never share this OTP with anyone. Job Portal staff will never ask for your OTP.
      </div>

      <p>If you didn't request a password reset, you can safely ignore this email. Your account is secure.</p>
    </div>

    <div class="footer">
      <p>Best Regards,<br><strong>Job Portal Team</strong></p>
      <p>&copy; 2024 Job Portal. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
export default forgotPasswordOtpTemplate;
