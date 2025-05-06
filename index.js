import express from 'express';
import { pipeline } from 'stream';
import { promisify } from 'util';

const app = express();
const port = 3002;
const streamPipeline = promisify(pipeline);

app.get('/', async (req, res) => {
  try {
    const apiRes = await fetch('https://api.github.com/repos/rustdesk/rustdesk/releases/latest', {
      headers: { 'User-Agent': 'node.js' },
    });

    if (!apiRes.ok) throw new Error(`Failed to fetch release: ${apiRes.status}`);

    const release = await apiRes.json();

    const asset = release.assets.find(a =>
      a.name.match(/^rustdesk-.*x86_64\.exe$/)
    );

    if (!asset) throw new Error('No matching Windows EXE found.');

    const fileRes = await fetch(asset.browser_download_url);
    if (!fileRes.ok) throw new Error(`Download failed: ${fileRes.statusText}`);

    // Set appropriate headers
    res.setHeader('Content-Disposition', `attachment; filename="${asset.name}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    await streamPipeline(fileRes.body, res);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
