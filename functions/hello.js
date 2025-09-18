export async function handler(event, context) {
  const apiRes = await fetch(
    "https://api.github.com/repos/rustdesk/rustdesk/releases/latest",
    {
      headers: { "User-Agent": "node.js" },
    }
  );

  if (!apiRes.ok) throw new Error(`Failed to fetch release: ${apiRes.status}`);

  const release = await apiRes.json();

  const asset = release.assets.find((a) =>
    a.name.match(/^rustdesk-.*x86_64\.exe$/)
  );

  if (!asset) throw new Error("No matching Windows EXE found.");

  const url = asset.browser_download_url;
    return {
    statusCode: 302,
    headers: {
      Location: url, // this tells the browser to redirect
    },
  };

}
