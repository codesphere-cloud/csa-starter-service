const http = require('http');

const PORT = Number(process.env.PORT || 3000);
const tenantName = process.env.TENANT_NAME || 'Unknown Tenant';
const appVersion = process.env.APP_VERSION || 'dev';
const rawScheme = process.env.colorSchema || 'default';

const normalizedScheme = String(rawScheme).trim().toLowerCase();

function resolveTheme(scheme) {
  if (scheme === 'dark') {
    return {
      name: 'dark',
      bg: '#111827',
      panel: '#1f2937',
      text: '#f9fafb',
      accent: '#22d3ee',
      subText: '#d1d5db'
    };
  }

  if (scheme === 'high-contrast' || scheme === 'highcontrast') {
    return {
      name: 'high-contrast',
      bg: '#000000',
      panel: '#ffffff',
      text: '#000000',
      accent: '#ffde00',
      subText: '#111111'
    };
  }

  return {
    name: 'default',
    bg: '#f4f6fb',
    panel: '#ffffff',
    text: '#1f2937',
    accent: '#0f766e',
    subText: '#6b7280'
  };
}

const theme = resolveTheme(normalizedScheme);

function renderHtml() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Starter Service</title>
  <style>
    :root {
      --bg: ${theme.bg};
      --panel: ${theme.panel};
      --text: ${theme.text};
      --sub-text: ${theme.subText};
      --accent: ${theme.accent};
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background:
        radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 40%),
        radial-gradient(circle at 80% 70%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 35%),
        var(--bg);
      color: var(--text);
      font-family: "Trebuchet MS", "Segoe UI", sans-serif;
      padding: 16px;
    }

    .card {
      width: min(760px, 100%);
      border-radius: 18px;
      padding: clamp(22px, 5vw, 42px);
      background: var(--panel);
      border: 2px solid color-mix(in srgb, var(--accent) 30%, var(--panel));
      box-shadow: 0 18px 50px color-mix(in srgb, var(--accent) 18%, transparent);
    }

    h1 {
      margin: 0 0 14px;
      font-size: clamp(1.5rem, 4.4vw, 2.6rem);
      line-height: 1.15;
      letter-spacing: 0.02em;
    }

    p {
      margin: 0;
      color: var(--sub-text);
      font-size: clamp(0.95rem, 2.6vw, 1.05rem);
    }

    footer {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 0.84rem;
      color: var(--sub-text);
      border-top: 1px solid color-mix(in srgb, var(--accent) 20%, #d1d5db);
      padding-top: 12px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      padding: 6px 10px;
      background: color-mix(in srgb, var(--accent) 14%, var(--panel));
      color: var(--text);
      font-weight: 600;
      font-size: 0.78rem;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <main class="card">
    <span class="pill">Starter Service</span>
    <h1>Welcome to the Starter Service ${tenantName}!</h1>
    <p>This page is rendered from environment variables injected from provider config.</p>
    <footer>
      <span>Theme: ${theme.name}</span>
      <span>App Version: ${appVersion}</span>
    </footer>
  </main>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  if (req.url !== '/') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
    return;
  }

  const html = renderHtml();
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`Starter service listening on http://localhost:${PORT}`);
});
