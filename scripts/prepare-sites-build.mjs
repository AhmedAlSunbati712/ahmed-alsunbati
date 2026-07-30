import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const hostingSource = resolve(root, ".openai", "hosting.json");
const hostingTarget = resolve(root, "dist", ".openai", "hosting.json");
const workerTarget = resolve(root, "dist", "server", "index.js");

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

await mkdir(dirname(hostingTarget), { recursive: true });
await mkdir(dirname(workerTarget), { recursive: true });

if (await exists(hostingSource)) {
  JSON.parse(await readFile(hostingSource, "utf8"));
  await copyFile(hostingSource, hostingTarget);
}

await writeFile(
  workerTarget,
  `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (!acceptsHtml) return response;

    const indexUrl = new URL("/index.html", request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
`,
  "utf8"
);
