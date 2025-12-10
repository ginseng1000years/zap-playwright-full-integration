const fs = require("fs");

const mockSession = {
  cookies: [
    {
      name: "session_id",
      value: "token-xyz",
      domain: "your-app-url.com",
      path: "/",
      expires: -1,
      httpOnly: false,
      secure: false,
      sameSite: "Lax"
    }
  ],
  origins: []
};

fs.writeFileSync("session.json", JSON.stringify(mockSession, null, 2));
console.log("Mock session.json created");