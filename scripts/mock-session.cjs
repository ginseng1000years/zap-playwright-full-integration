const fs = require("fs");

const mockSession = {
  cookies: [
    {
      name: "JSESSIONID",
      value: "fake-session-1234567890",
      domain: "your-app-url.com",
      path: "/",
      expires: -1,
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }
  ],
  origins: []
};

fs.writeFileSync("session.json", JSON.stringify(mockSession, null, 2));
console.log("Mock session.json created");
