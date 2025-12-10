const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  // 👇 Step 1: Load page
  await page.goto(process.env.APP_URL, { waitUntil: "networkidle" });

  // === JSF thường có 2 bước login ===
  // Step 1: Username screen
  await page.fill("#username", process.env.APP_USER);
  await page.click("button[type=submit]");

  // Chờ chuyển qua màn pass
  await page.waitForSelector("#password", { timeout: 10000 });

  // Step 2: Password screen
  await page.fill("#password", process.env.APP_PASS);
  await page.click("button[type=submit]");

  // Chờ login hoàn tất (JSF redirect)
  await page.waitForLoadState("networkidle");

  // Optional: Nếu app redirect sau login
  try {
    await page.waitForURL("**/dashboard", { timeout: 5000 });
  } catch {
    // Không sao, JSF đôi khi không có dashboard riêng
  }

  // === Xuất cookie dành cho ZAP ===
  const cookies = await page.context().cookies();

  const jsession = cookies.find((c) => c.name === "JSESSIONID");

  if (!jsession) {
    console.error("ERROR: Không tìm thấy cookie JSESSIONID. Login có thể lỗi.");
    process.exit(1);
  }

  fs.writeFileSync(
    "session.json",
    JSON.stringify(
      {
        JSESSIONID: jsession.value,
        domain: jsession.domain,
        path: jsession.path || "/"
      },
      null,
      2
    )
  );

  console.log("Session saved:", jsession.value);

  await browser.close();
})();
