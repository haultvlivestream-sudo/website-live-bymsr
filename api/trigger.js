export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { targetYml, ytUrl, rtmpKey } = req.body;

    const GITHUB_USERNAME = "haultvlivestream-sudo";
    const GITHUB_REPO = "liveyt-denganlogo2026-amanlag";
    const GITHUB_TOKEN = process.env.GH_PAT_TOKEN; // Ini mengambil dari Secret Vercel kamu

    if (!GITHUB_TOKEN) {
        return res.status(500).json({ message: 'Token GH_PAT_TOKEN belum terbaca di Vercel Environment Variables.' });
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/actions/workflows/${targetYml}/dispatches`, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ref: 'main',
                inputs: {
                    youtube_url: ytUrl,
                    rtmp_key: rtmpKey
                }
            })
        });

        if (response.ok || response.status === 204) {
            return res.status(200).json({ success: true, message: `Workflow '${targetYml}' berhasil dijalankan!` });
        } else {
            const errData = await response.json();
            return res.status(response.status).json({ message: errData.message || "Gagal memicu GitHub Action." });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Terjadi kesalahan koneksi server.' });
    }
      }
  
