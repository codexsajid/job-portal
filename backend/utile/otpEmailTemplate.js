const otpEmailTemplate = (fullname, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your OTP Code</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 450px;
      margin: auto;
      background: #ffffff;
      padding: 25px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      box-shadow:0 2px 6px rgba(0,0,0,0.05);
    }
    .title {
      text-align: center;
      color: #111827;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .otp-box {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 6px;
      text-align: center;
      margin: 25px 0;
      color: #2563eb;
    }
    p {
      color: #374151;
      line-height: 1.6;
      font-size: 15px;
    }
    .footer {
      text-align: center;
      margin-top: 25px;
      font-size: 13px;
      color: #6b7280;
    }
  </style>
</head>

<body>
  <div class="container">
    <p class="title">Verify Your Identity</p>

    <p>Hi ${fullname},</p>
    <p>Your One-Time Password to verify your identity is:</p>

    <div class="otp-box">${otp}</div>

    <p>This OTP is valid for <strong>5 minutes</strong>.<br/>
    If you didn't request this code, you can safely ignore this email.</p>

    <p class="footer">© ${new Date().getFullYear()} Job Portal. All rights reserved.</p>
  </div>
</body>
</html>
`;
export default otpEmailTemplate;
