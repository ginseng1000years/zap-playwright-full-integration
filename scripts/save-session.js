const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://your-app-url.com/login");

  // Nhập username & password
  await page.fill("#username", process.env.APP_USER);
  await page.fill("#password", process.env.APP_PASS);
  await page.click("button[type=submit]");

  // Chờ login thành công
  await page.waitForURL("**/dashboard");

  const session = await page.context().storageState();
  fs.writeFileSync("session.json", JSON.stringify(session, null, 2));

  await browser.close();
})();
