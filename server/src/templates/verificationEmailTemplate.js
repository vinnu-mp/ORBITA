const verificationEmailTemplate = (username, otp) => {
  return `
  <div style="
    background-color:#0b1020;
    color:#ffffff;
    padding:40px;
    font-family:Arial,sans-serif;
    text-align:center;
  ">
    
    <h1 style="font-size:32px; margin-bottom:10px;">
      🚀 Welcome to Orbita
    </h1>

    <p style="color:#cbd5e1; font-size:16px;">
      Verify your email to begin exploring space.
    </p>

    <div style="
      margin:30px auto;
      background:#111827;
      padding:20px;
      border-radius:12px;
      max-width:300px;
    ">
      <p style="margin-bottom:10px; color:#94a3b8;">
        Verification Code
      </p>

      <h2 style="
        letter-spacing:6px;
        font-size:32px;
        color:#38bdf8;
        margin:0;
      ">
        ${otp}
      </h2>
    </div>

    <p style="color:#64748b; font-size:14px;">
      This code expires in 10 minutes.
    </p>

    <p style="
      margin-top:40px;
      color:#475569;
      font-size:12px;
    ">
      Orbita • Explore Beyond Earth 🌌
    </p>

  </div>
  `;
};

export default verificationEmailTemplate;
