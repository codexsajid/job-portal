const passwordResetEmailTemplate = (fullname) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            color: #333;
            border-bottom: 3px solid #007bff;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .content {
            color: #555;
            line-height: 1.6;
        }
        .success-icon {
            font-size: 24px;
            margin-right: 10px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #eee;
            color: #999;
            font-size: 12px;
            text-align: center;
        }
        .highlight {
            background-color: #e7f3ff;
            padding: 15px;
            border-left: 4px solid #007bff;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2><span class="success-icon">✅</span>Password Reset Successful</h2>
        </div>
        <div class="content">
            <p>Hello <strong>${fullname}</strong>,</p>
            <p>Your password has been successfully changed.</p>
            
            <div class="highlight">
                <p><strong>🔒 Security Notice:</strong></p>
                <p>If you did not request this password change, please contact our support team immediately.</p>
            </div>
            
            <p>You can now log in to your account with your new password.</p>
            
            <p><strong>Tips for account security:</strong></p>
            <ul>
                <li>Never share your password with anyone</li>
                <li>Use a strong, unique password</li>
                <li>Log out after using Job Portal on shared computers</li>
            </ul>
            
            <p>If you have any questions or need assistance, feel free to contact us.</p>
        </div>
        <div class="footer">
            <p>Best Regards,<br><strong>Job Portal Team</strong></p>
            <p>&copy; 2024 Job Portal. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
export default passwordResetEmailTemplate;
