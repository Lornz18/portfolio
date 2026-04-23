const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const keyMatch = envFile.match(/GEMINI_KEY=(.+)/);
if (!keyMatch) {
  console.error("No key");
  process.exit(1);
}
const key = keyMatch[1].trim();

async function run() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    const geminiModels = data.models.map(m => m.name).filter(n => n.includes("gemini"));
    fs.writeFileSync('models.txt', JSON.stringify(geminiModels, null, 2));
    console.log("Done");
  } catch (e) {
    console.error(e);
  }
}
run();
