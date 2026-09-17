export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { pin } = req.body;
    const SERVER_PIN = process.env.WEB_PIN || "786786";

    // Cek apakah PIN yang diketik sama dengan Secret Vercel
    if (pin === SERVER_PIN) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false, message: 'PIN Salah!' });
    }
          }
