const welcomeEmailTemplate = (username) => {
  return `
  <div style="
    background-color:#0b1020;
    color:#ffffff;
    padding:40px;
    font-family:Arial,sans-serif;
    text-align:center;
  ">

    <h1 style="font-size:32px; margin-bottom:10px;">
      🌌 Welcome Aboard, ${username}
    </h1>

    <p style="
      color:#cbd5e1;
      font-size:16px;
      max-width:500px;
      margin:auto;
      line-height:1.6;
    ">
      Your journey through space exploration begins now.
      Stay updated with launches, discoveries, missions,
      and fascinating facts from the universe.
    </p>

    <div style="
      margin-top:30px;
      padding:20px;
      background:#111827;
      border-radius:12px;
      display:inline-block;
    ">
      🚀 Explore Space News <br/>
      🛰 Learn Space Systems <br/>
      🌍 Discover the Universe
    </div>

    <p style="
      margin-top:40px;
      color:#64748b;
      font-size:12px;
    ">
      Orbita • Explore Beyond Earth
    </p>

  </div>
  `;
};

export default welcomeEmailTemplate;
