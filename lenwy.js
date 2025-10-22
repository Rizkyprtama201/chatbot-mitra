/*  

  Made By Lenwy
  Base : Lenwy
  WhatsApp : wa.me/6283829814737
  Telegram : t.me/ilenwy
  Youtube : @Lenwy

  Channel : https://whatsapp.com/channel/0029VaGdzBSGZNCmoTgN2K0u

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

// Import Module
require('./len')
require('./database/Menu/LenwyMenu')
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Import Scrape
const Ai4Chat = require('./scrape/Ai4Chat');
const tiktok2 = require('./scrape/Tiktok');

// ==== FILE JSON UNTUK VERIFIKASI LMS ====
const verifikasiFile = path.join(__dirname, 'database', 'verifikasi.json');
const validUsersFile = path.join(__dirname, 'database', 'validUsers.json');

// Pastikan file ada
if (!fs.existsSync(verifikasiFile)) fs.writeFileSync(verifikasiFile, JSON.stringify({}));
if (!fs.existsSync(validUsersFile)) {
    fs.writeFileSync(validUsersFile, JSON.stringify([
        { id: "12345", nama: "Andi" },
        { id: "67890", nama: "Budi" }
    ]));
}

// Fungsi bantu baca/tulis verifikasi
const loadVerifikasi = () => JSON.parse(fs.readFileSync(verifikasiFile, 'utf-8'));
const saveVerifikasi = (data) => fs.writeFileSync(verifikasiFile, JSON.stringify(data, null, 2));
const loadValidUsers = () => JSON.parse(fs.readFileSync(validUsersFile, 'utf-8'));

// ============================
module.exports = async (lenwy, m) => {
    const msg = m.messages[0];
    if (!msg.message) return;

    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const sender = msg.key.remoteJid;
    const pushname = msg.pushName || "Lenwy";
    const args = body.slice(1).trim().split(" ");
    const command = args.shift().toLowerCase();
    const q = args.join(" ");

    if (!body.startsWith(prefix)) return;

    const lenwyreply = (teks) => lenwy.sendMessage(sender, { text: teks }, { quoted: msg });
    const isGroup = sender.endsWith('@g.us');
    const isAdmin = (admin.includes(sender))
    const menuImage = fs.readFileSync(image);

switch (command) {

    // Menu
    case "menu": {
        await lenwy.sendMessage(sender,
            {
                image: menuImage,
                caption: lenwymenu,
                mentions: [sender]
            },
        { quoted: msg }
        )
    }
    break

    // Hanya Admin
    case "admin": {
        if (!isAdmin) return lenwyreply(mess.admin);
        lenwyreply("🎁 *Kamu Adalah Admin*");
    }
    break

    // Hanya Group
    case "group": {
        if (!isGroup) return lenwyreply(mess.group);
        lenwyreply("🎁 *Kamu Sedang Berada Di Dalam Grup*");
    }
    break

    // AI Chat
    case "ai": {
        if (!q) return lenwyreply("☘️ *Contoh:* !ai Apa itu JavaScript?");
        lenwyreply(mess.wait);
        try {
            const lenai = await Ai4Chat(q);
            await lenwyreply(`*Lenwy AI*\n\n${lenai}`);
        } catch (error) {
            console.error("Error:", error);
            lenwyreply(mess.error);
        }
    }
    break;

    case "jawa": {
        if (!q) return lenwyreply("⚠ *jawa adalah suku terbaik?*");
        lenwyreply(mess.wait);
        try {
            const result = await tiktok2(q);

            await lenwy.sendMessage(
                sender,
                {
                    video: { url: result.no_watermark },
                    caption: `*🎁 Lenwy Tiktok Downloader*`
                },
                { quoted: msg }
            );

        } catch (error) {
            console.error("Error TikTok DL:", error);
            lenwyreply(mess.error);
        }
    }
    break;

    case "igdl": {
        if (!q) return lenwyreply("⚠ *Mana Link Instagramnya?*");
        try {
            lenwyreply(mess.wait);

            const apiUrl = `https://www.velyn.biz.id/api/downloader/instagram?url=${encodeURIComponent(q)}`;
            const response = await axios.get(apiUrl);

            if (!response.data.status || !response.data.data.url[0]) {
                throw new Error("Link tidak valid atau API error");
            }

            const data = response.data.data;
            const mediaUrl = data.url[0];
            const metadata = data.metadata;

            if (metadata.isVideo) {
                await lenwy.sendMessage(
                    sender,
                    {
                        video: { url: mediaUrl },
                        caption: `*Instagram Reel*\n\n` +
                            `*Username :* ${metadata.username}\n` +
                            `*Likes :* ${metadata.like.toLocaleString()}\n` +
                            `*Comments :* ${metadata.comment.toLocaleString()}\n\n` +
                            `*Caption :* ${metadata.caption || '-'}\n\n` +
                            `*Source :* ${q}`
                    },
                    { quoted: msg }
                );
            } else {
                await lenwy.sendMessage(
                    sender,
                    {
                        image: { url: mediaUrl },
                        caption: `*Instagram Post*\n\n` +
                            `*Username :* ${metadata.username}\n` +
                            `*Likes :* ${metadata.like.toLocaleString()}\n\n` +
                            `*Caption :* ${metadata.caption || '-'}`
                    },
                    { quoted: msg }
                );
            }

        } catch (error) {
            console.error("Error Instagram DL:", error);
            lenwyreply(mess.error);
        }
    }
    break;

    // Game Tebak Angka
    case "tebakangka": {
        const target = Math.floor(Math.random() * 100);
        lenwy.tebakGame = { target, sender };
        lenwyreply("*Tebak Angka 1 - 100*\n*Ketik !tebak [Angka]*");
    }
    break;

    case "tebak": {
        if (!lenwy.tebakGame || lenwy.tebakGame.sender !== sender) return;
        const guess = parseInt(args[0]);
        if (isNaN(guess)) return lenwyreply("❌ *Masukkan Angka!*");

        if (guess === lenwy.tebakGame.target) {
            lenwyreply(`🎉 *Tebakkan Kamu Benar!*`);
            delete lenwy.tebakGame;
        } else {
            lenwyreply(guess > lenwy.tebakGame.target ? "*Terlalu Tinggi!*" : "*Terlalu rendah!*");
        }
    }
    break;

    case "quote": {
        const quotes = [
            "Semangat Tahun depan kita wisuda.",
            "Kesempatan tidak datang dua kali.",
            "Kamu lebih kuat dari yang kamu kira.",
            "Tidak perlu kata-kata, yang penting bukti nyata."
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        lenwyreply(`*Quote Hari Ini :*\n_"${randomQuote}"_`);
    }
    break;

    // ===== FITUR LMS BPS =====
    case "pelatihan": {
        let verifikasiData = loadVerifikasi();
        const userData = verifikasiData[sender] || { step: 1 };

        if (userData.step === 1) {
            userData.step = 2;
            verifikasiData[sender] = userData;
            saveVerifikasi(verifikasiData);
            return lenwyreply("📌 Silahkan masukkan ID Sobat BPS Anda:");
        }

        if (userData.step === 2) {
            userData.id = body.trim();
            userData.step = 3;
            verifikasiData[sender] = userData;
            saveVerifikasi(verifikasiData);
            return lenwyreply("📌 Terima kasih. Sekarang masukkan nama lengkap Anda:");
        }

        if (userData.step === 3) {
            userData.nama = body.trim();

            const validUsers = loadValidUsers();
            const found = validUsers.find(u => u.id === userData.id && u.nama.toLowerCase() === userData.nama.toLowerCase());

            if (found) {
                delete verifikasiData[sender];
                saveVerifikasi(verifikasiData);
                return lenwyreply("✅ Verifikasi berhasil! Berikut daftar pelatihan:\n- Statistik Dasar\n- Analisis Data\n- Survei Lapangan");
            } else {
                delete verifikasiData[sender];
                saveVerifikasi(verifikasiData);
                return lenwyreply("❌ Verifikasi gagal. ID atau nama tidak valid.");
            }
        }
    }
    break;

    // Default
    default: { lenwyreply(mess.default) }
}
}
