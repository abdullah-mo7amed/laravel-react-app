<html>

<body style="font-family: Arial, sans-serif; background: #f8f9fa; padding: 32px;">
  <div
    style="background: #fff; border-radius: 8px; padding: 32px; max-width: 500px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.07);">
    <h2 style="color: #222;">Thank you for your order!</h2>
    <p>Dear {{ $user->name ?? 'Customer' }},</p>
    <p>We appreciate your trust. Your order has been received and is being processed.</p>
    <p style="margin-top: 32px; color: #888; font-size: 0.95em;">If you have any questions, just reply to this email.</p>
    <p style="margin-top: 24px;">Best regards,<br>izam Team</p>
  </div>
</body>

</html>
