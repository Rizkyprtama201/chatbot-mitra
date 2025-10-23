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
const PDFDocument = require('pdfkit');

// ==== FILE JSON UNTUK VERIFIKASI LMS ====
const verifikasiFile = path.join(__dirname, 'database', 'verifikasi.json');
const validUsersFile = path.join(__dirname, 'database', 'validUsers.json');
const sertifikatFile = path.join(__dirname, 'database', 'sertifikat.json');
const trackingFile = path.join(__dirname, 'database', 'tracking.json'); // FILE BARU UNTUK TRACKING

// DATA KUIS STATISTIK DASAR
const kuisStatistikDasar = [
  {
    nomor: 1,
    soal: "Apa yang dimaksud dengan statistika?",
    pilihan: {
      a: "Ilmu yang mempelajari tentang angka-angka",
      b: "Ilmu yang mempelajari tentang data dan cara pengolahannya", 
      c: "Ilmu yang mempelajari tentang grafik dan tabel",
      d: "Ilmu yang mempelajari tentang probabilitas"
    },
    jawaban: "b",
    penjelasan: "Statistika adalah ilmu yang mempelajari tentang pengumpulan, analisis, interpretasi, dan penyajian data."
  },
  {
    nomor: 2,
    soal: "Data yang diperoleh dari hasil pengukuran disebut data?",
    pilihan: {
      a: "Data kualitatif",
      b: "Data kuantitatif",
      c: "Data primer", 
      d: "Data sekunder"
    },
    jawaban: "b",
    penjelasan: "Data kuantitatif adalah data yang berupa angka hasil pengukuran, sedangkan kualitatif adalah data deskriptif."
  },
  {
    nomor: 3,
    soal: "Ukuran pemusatan data yang paling stabil adalah?",
    pilihan: {
      a: "Mean",
      b: "Median",
      c: "Modus",
      d: "Range"
    },
    jawaban: "a",
    penjelasan: "Mean (rata-rata) paling stabil karena mempertimbangkan semua nilai data, tidak seperti median dan modus."
  },
  {
    nomor: 4,
    soal: "Simpangan baku merupakan ukuran dari?",
    pilihan: {
      a: "Pemusatan data",
      b: "Penyebaran data",
      c: "Kemiringan data",
      d: "Keruncingan data"
    },
    jawaban: "b",
    penjelasan: "Simpangan baku mengukur seberapa jauh data tersebar dari nilai rata-ratanya."
  },
  {
    nomor: 5,
    soal: "Nilai yang paling sering muncul dalam suatu data disebut?",
    pilihan: {
      a: "Mean",
      b: "Median", 
      c: "Modus",
      d: "Varians"
    },
    jawaban: "c",
    penjelasan: "Modus adalah nilai yang paling sering muncul dalam sekumpulan data."
  }
];

// DATA PELATIHAN DENGAN MATERI DOKUMEN & VIDEO
const pelatihanList = {
  1: {
    id: "STATDAS",
    nama: "Statistik Dasar",
    level: "Pemula", // DURASI DIHAPUS, AKAN DIHITUNG OTOMATIS
    deskripsi: "Pelatihan konsep dasar statistik, pengenalan data, dan metode analisis sederhana",
    materi: [
      "Pengenalan Statistika",
      "Jenis-jenis Data", 
      "Distribusi Frekuensi",
      "Ukuran Pemusatan Data",
      "Ukuran Penyebaran Data"
    ],
    instruktur: "Prof.Dr.Muhammad Arifin, S.T M.Kom",
    materiFiles: {
      pdf: [
        {
          nama: "Surhaliza Aprilianti.pdf",
          filename: "Surhaliza_Aprilianti.pdf",
          deskripsi: "Modul lengkap statistik dasar untuk pemula"
        },
        {
          nama: "Latihan Soal Statistik.pdf", 
          filename: "latihan_soal_statistik.pdf",
          deskripsi: "Kumpulan latihan soal dan pembahasan"
        }
      ],
      video: [
        {
          nama: "Pengenalan Statistika.mp4",
          filename: "pengenalan_statistika.mp4",
          deskripsi: "Video pengenalan konsep dasar statistika",
          durasi: "15 menit"
        }
      ]
    }
  },
  2: {
    id: "ANALDATA",
    nama: "Analisis Data",
    level: "Menengah", // DURASI DIHAPUS
    deskripsi: "Teknik analisis data statistik menggunakan tools modern",
    materi: [
      "Regresi Linear",
      "Analisis Korelasi",
      "Uji Hipotesis",
      "ANOVA",
      "Analisis Time Series"
    ],
    instruktur: "Prof. Sari, M.Sc., Ph.D",
    materiFiles: {
      pdf: [
        {
          nama: "Panduan Analisis Data.pdf",
          filename: "panduan_analisis_data.pdf",
          deskripsi: "Panduan lengkap analisis data statistik"
        }
      ],
      video: [
        {
          nama: "Regresi Linear.mp4",
          filename: "regresi_linear.mp4",
          deskripsi: "Video tutorial analisis regresi linear",
          durasi: "25 menit"
        }
      ]
    }
  },
  3: {
    id: "SURVEY", 
    nama: "Survei Lapangan",
    level: "Lanjutan", // DURASI DIHAPUS
    deskripsi: "Metodologi survei dan teknik pengumpulan data lapangan",
    materi: [
      "Desain Kuesioner",
      "Sampling Methods",
      "Fieldwork Management",
      "Data Cleaning",
      "Quality Control"
    ],
    instruktur: "Drs. Budi, M.Eng",
    materiFiles: {
      pdf: [
        {
          nama: "Metodologi Survei.pdf",
          filename: "metodologi_survei.pdf",
          deskripsi: "Panduan metodologi survei lapangan"
        }
      ],
      video: [
        {
          nama: "Teknik Wawancara.mp4",
          filename: "teknik_wawancara.mp4",
          deskripsi: "Video teknik wawancara survei yang efektif",
          durasi: "18 menit"
        }
      ]
    }
  },
  4: {
    id: "PROGSTAT",
    nama: "Pemrograman Statistik", 
    level: "Menengah", // DURASI DIHAPUS
    deskripsi: "Pemrograman R dan Python untuk analisis statistik",
    materi: [
      "Dasar R/Python",
      "Data Manipulation",
      "Visualisasi Data",
      "Statistical Modeling",
      "Report Automation"
    ],
    instruktur: "Rina, S.Kom, M.T",
    materiFiles: {
      pdf: [
        {
          nama: "Panduan R untuk Statistik.pdf",
          filename: "panduan_r_statistik.pdf",
          deskripsi: "Panduan pemrograman R untuk analisis statistik"
        },
        {
          nama: "Python Data Analysis.pdf",
          filename: "python_data_analysis.pdf",
          deskripsi: "Analisis data dengan Python untuk statistika"
        }
      ],
      video: [
        {
          nama: "Instalasi dan Setup R.mp4",
          filename: "instalasi_setup_r.mp4",
          deskripsi: "Video tutorial instalasi dan setup environment R",
          durasi: "12 menit"
        }
      ]
    }
  }
};

// Pastikan file dan directory ada
const ensureFilesExist = () => {
    const dbDir = path.join(__dirname, 'database');
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    
    // Buat folder materi jika belum ada
    const materiDir = path.join(__dirname, 'materi');
    if (!fs.existsSync(materiDir)) {
        fs.mkdirSync(materiDir, { recursive: true });
        console.log('Created materi directory:', materiDir);
    }
    
    // Buat folder sertifikat PDF jika belum ada
    const sertifikatDir = path.join(__dirname, 'sertifikat_pdf');
    if (!fs.existsSync(sertifikatDir)) {
        fs.mkdirSync(sertifikatDir, { recursive: true });
        console.log('Created sertifikat PDF directory:', sertifikatDir);
    }
    
    // Buat subfolder untuk setiap pelatihan
    Object.values(pelatihanList).forEach(pelatihan => {
        const subDir = path.join(materiDir, pelatihan.id);
        if (!fs.existsSync(subDir)) {
            fs.mkdirSync(subDir, { recursive: true });
            console.log('Created subdirectory:', subDir);
            
            // Buat file placeholder
            const readmePath = path.join(subDir, 'README.txt');
            fs.writeFileSync(readmePath, 
                `Folder untuk materi pelatihan ${pelatihan.nama}\n\n` +
                `Silakan letakkan file PDF dan video di folder ini.\n\n` +
                `Format nama file harus sesuai dengan yang ada di kode:\n` +
                `${pelatihan.materiFiles.pdf.map(pdf => `- ${pdf.filename}`).join('\n')}\n` +
                `${pelatihan.materiFiles.video.map(video => `- ${video.filename}`).join('\n')}`
            );
            
            // Buat file contoh PDF untuk testing
            if (pelatihan.materiFiles.pdf.length > 0) {
                const contohPdf = pelatihan.materiFiles.pdf[0];
                const contohPath = path.join(subDir, contohPdf.filename);
                if (!fs.existsSync(contohPath)) {
                    // Buat file PDF dummy untuk testing
                    const pdfContent = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 12 Tf\n72 720 Td\n(Contoh PDF untuk ${pelatihan.nama}) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000234 00000 n \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n297\n%%EOF`;
                    fs.writeFileSync(contohPath, pdfContent);
                    console.log('Created sample PDF:', contohPath);
                }
            }
        }
    });
    
    if (!fs.existsSync(verifikasiFile)) fs.writeFileSync(verifikasiFile, JSON.stringify({}));
    if (!fs.existsSync(validUsersFile)) {
        fs.writeFileSync(validUsersFile, JSON.stringify([
            { id: "12345", nama: "Andi" },
            { id: "67890", nama: "Budi" },
            { id: "BPS001", nama: "Sari" },
            { id: "BPS002", nama: "Rudi" }
        ], null, 2));
    }
    if (!fs.existsSync(sertifikatFile)) {
        fs.writeFileSync(sertifikatFile, JSON.stringify({}, null, 2));
    }
    if (!fs.existsSync(trackingFile)) {
        fs.writeFileSync(trackingFile, JSON.stringify({}, null, 2));
    }
};

ensureFilesExist();

// ===== FUNGSI BARU UNTUK TRACKING WAKTU =====
const loadTracking = () => {
    try {
        const data = fs.readFileSync(trackingFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading tracking:', error);
        return {};
    }
};

const saveTracking = (data) => {
    try {
        fs.writeFileSync(trackingFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving tracking:', error);
    }
};

// Fungsi untuk memulai tracking waktu
const startTracking = (sender, pelatihanId) => {
    const trackingData = loadTracking();
    
    if (!trackingData[sender]) {
        trackingData[sender] = {};
    }
    
    if (!trackingData[sender][pelatihanId]) {
        trackingData[sender][pelatihanId] = {
            startTime: new Date().toISOString(),
            pdfAccessTime: null,
            quizStartTime: null,
            quizEndTime: null,
            totalDuration: null
        };
    } else {
        // Jika sudah ada, update startTime
        trackingData[sender][pelatihanId].startTime = new Date().toISOString();
    }
    
    saveTracking(trackingData);
    console.log(`Started tracking for ${sender} - ${pelatihanId}`);
};

// Fungsi untuk mencatat waktu akses PDF
const recordPdfAccess = (sender, pelatihanId) => {
    const trackingData = loadTracking();
    
    if (trackingData[sender] && trackingData[sender][pelatihanId]) {
        trackingData[sender][pelatihanId].pdfAccessTime = new Date().toISOString();
        saveTracking(trackingData);
        console.log(`Recorded PDF access for ${sender} - ${pelatihanId}`);
    }
};

// Fungsi untuk memulai tracking kuis
const startQuizTracking = (sender, pelatihanId) => {
    const trackingData = loadTracking();
    
    if (trackingData[sender] && trackingData[sender][pelatihanId]) {
        trackingData[sender][pelatihanId].quizStartTime = new Date().toISOString();
        saveTracking(trackingData);
        console.log(`Started quiz tracking for ${sender} - ${pelatihanId}`);
    }
};

// Fungsi untuk menyelesaikan tracking dan menghitung durasi
const completeTracking = (sender, pelatihanId) => {
    const trackingData = loadTracking();
    
    if (trackingData[sender] && trackingData[sender][pelatihanId]) {
        const track = trackingData[sender][pelatihanId];
        const endTime = new Date();
        const startTime = new Date(track.startTime);
        
        // Hitung durasi total dalam menit
        const durationMs = endTime - startTime;
        const durationMinutes = Math.floor(durationMs / (1000 * 60));
        const durationHours = Math.floor(durationMinutes / 60);
        const remainingMinutes = durationMinutes % 60;
        
        track.quizEndTime = endTime.toISOString();
        track.totalDuration = durationMinutes;
        track.durationDisplay = durationHours > 0 
            ? `${durationHours} jam ${remainingMinutes} menit`
            : `${durationMinutes} menit`;
        
        saveTracking(trackingData);
        console.log(`Completed tracking for ${sender} - ${pelatihanId}: ${track.durationDisplay}`);
        
        return track;
    }
    return null;
};

// Fungsi untuk mendapatkan durasi pengerjaan
const getDuration = (sender, pelatihanId) => {
    const trackingData = loadTracking();
    
    if (trackingData[sender] && trackingData[sender][pelatihanId]) {
        return trackingData[sender][pelatihanId];
    }
    return null;
};

// Fungsi bantu baca/tulis verifikasi
const loadVerifikasi = () => {
    try {
        const data = fs.readFileSync(verifikasiFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading verifikasi:', error);
        return {};
    }
};

const saveVerifikasi = (data) => {
    try {
        fs.writeFileSync(verifikasiFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving verifikasi:', error);
    }
};

const loadValidUsers = () => {
    try {
        const data = fs.readFileSync(validUsersFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading valid users:', error);
        return [];
    }
};

// Fungsi untuk baca/tulis sertifikat
const loadSertifikat = () => {
    try {
        const data = fs.readFileSync(sertifikatFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading sertifikat:', error);
        return {};
    }
};

const saveSertifikat = (data) => {
    try {
        fs.writeFileSync(sertifikatFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving sertifikat:', error);
    }
};

// Fungsi untuk mendapatkan path file yang benar
const getFilePath = (pelatihanId, filename) => {
    const possiblePaths = [
        path.join(__dirname, 'materi', pelatihanId, filename),
        path.join(__dirname, 'materi', pelatihanId, filename.toLowerCase()),
        path.join(__dirname, 'materi', pelatihanId, filename.toUpperCase()),
    ];
    
    for (const filePath of possiblePaths) {
        if (fs.existsSync(filePath)) {
            console.log('File found at:', filePath);
            return filePath;
        }
    }
    
    // Coba cari file dengan pattern yang mirip
    const materiDir = path.join(__dirname, 'materi', pelatihanId);
    if (fs.existsSync(materiDir)) {
        const files = fs.readdirSync(materiDir);
        const matchingFile = files.find(file => 
            file.toLowerCase().includes(filename.toLowerCase().replace('.pdf', '').replace('.mp4', ''))
        );
        if (matchingFile) {
            const foundPath = path.join(materiDir, matchingFile);
            console.log('Found similar file:', foundPath);
            return foundPath;
        }
    }
    
    console.log('File not found for:', filename, 'in directory:', materiDir);
    return null;
};

// Fungsi untuk mengirim file
const sendFile = async (lenwy, sender, pelatihanId, fileInfo, fileType, quotedMsg) => {
    try {
        const filePath = getFilePath(pelatihanId, fileInfo.filename);
        
        if (!filePath) {
            console.log('File not found:', fileInfo.filename);
            return { success: false, error: 'File tidak ditemukan' };
        }
        
        const fileBuffer = fs.readFileSync(filePath);
        const fileExt = path.extname(filePath).toLowerCase();
        
        console.log(`Sending ${fileType}: ${filePath}, Size: ${fileBuffer.length} bytes`);
        
        if (fileExt === '.pdf') {
            await lenwy.sendMessage(sender, {
                document: fileBuffer,
                fileName: fileInfo.nama,
                caption: `${fileInfo.nama}\n\n${fileInfo.deskripsi}`,
                mimetype: 'application/pdf'
            }, { quoted: quotedMsg });
        } else if (['.mp4', '.avi', '.mov', '.mkv'].includes(fileExt)) {
            await lenwy.sendMessage(sender, {
                video: fileBuffer,
                caption: `${fileInfo.nama}\n\n${fileInfo.deskripsi}${fileInfo.durasi ? `\nDurasi: ${fileInfo.durasi}` : ''}`
            }, { quoted: quotedMsg });
        } else {
            // Fallback untuk file type lainnya
            await lenwy.sendMessage(sender, {
                document: fileBuffer,
                fileName: fileInfo.nama,
                caption: `${fileInfo.nama}\n\n${fileInfo.deskripsi}`
            }, { quoted: quotedMsg });
        }
        
        console.log(`Successfully sent ${fileType}: ${fileInfo.nama}`);
        return { success: true };
        
    } catch (error) {
        console.error(`Error sending ${fileType}:`, error);
        return { success: false, error: error.message };
    }
};

// ===== FUNGSI UNTUK MEMBUAT SERTIFIKAT PDF (DIMODIFIKASI) =====
const createSertifikatPDF = async (nama, pelatihan, score, totalSoal, durasiPengerjaan) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                size: 'A4',
                margins: { top: 50, bottom: 50, left: 50, right: 50 }
            });
            
            const now = new Date();
            const sertifikatId = `SRT-${pelatihan.id}-${now.getTime()}`;
            const filename = `Sertifikat_${pelatihan.nama}_${nama.replace(/\s+/g, '_')}.pdf`;
            const filePath = path.join(__dirname, 'sertifikat_pdf', filename);
            
            // Pipe output ke file
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);
            
            // ===== DESAIN SERTIFIKAT =====
            
            // Background color
            doc.rect(0, 0, doc.page.width, doc.page.height)
               .fill('#f8f9fa');
            
            // Header dengan gradient
            const gradient = doc.linearGradient(50, 50, doc.page.width - 50, 120)
                .stop(0, '#2c3e50')
                .stop(1, '#3498db');
                
            doc.rect(50, 50, doc.page.width - 100, 70)
               .fill(gradient);
            
            // Judul Sertifikat
            doc.fontSize(24)
               .font('Helvetica-Bold')
               .fillColor('#ffffff')
               .text('SERTIFIKAT KELULUSAN', 50, 70, {
                   width: doc.page.width - 100,
                   align: 'center'
               });
            
            doc.fontSize(14)
               .text('Badan Pusat Statistik', 50, 100, {
                   width: doc.page.width - 100,
                   align: 'center'
               });
            
            // Garis dekoratif
            doc.strokeColor('#3498db')
               .lineWidth(3)
               .moveTo(100, 180)
               .lineTo(doc.page.width - 100, 180)
               .stroke();
            
            // Konten utama
            doc.fontSize(16)
               .font('Helvetica')
               .fillColor('#2c3e50')
               .text('Dengan ini menerangkan bahwa:', 100, 220, {
                   width: doc.page.width - 200,
                   align: 'center'
               });
            
            // Nama peserta (highlight)
            doc.fontSize(20)
               .font('Helvetica-Bold')
               .fillColor('#e74c3c')
               .text(nama, 100, 270, {
                   width: doc.page.width - 200,
                   align: 'center'
               });
            
            // Detail pelatihan
            doc.fontSize(12)
               .font('Helvetica')
               .fillColor('#2c3e50')
               .text(`Telah menyelesaikan program pelatihan:`, 100, 320, {
                   width: doc.page.width - 200,
                   align: 'center'
               });
            
            doc.fontSize(16)
               .font('Helvetica-Bold')
               .fillColor('#2980b9')
               .text(pelatihan.nama, 100, 350, {
                   width: doc.page.width - 200,
                   align: 'center'
               });
            
            // Informasi detail
            let yPosition = 400;
            doc.fontSize(11)
               .font('Helvetica')
               .fillColor('#2c3e50')
               .text(`Durasi Pengerjaan: ${durasiPengerjaan}`, 150, yPosition);
            
            doc.text(`Level: ${pelatihan.level}`, 150, yPosition + 20);
            doc.text(`Instruktur: ${pelatihan.instruktur}`, 150, yPosition + 40);
            
            // Nilai kuis
            doc.text(`Nilai Kuis: ${score}/${totalSoal}`, doc.page.width - 250, yPosition);
            
            const persentase = ((score / totalSoal) * 100).toFixed(1);
            doc.text(`Persentase: ${persentase}%`, doc.page.width - 250, yPosition + 20);
            
            // Status kelulusan
            yPosition += 80;
            doc.fontSize(14)
               .font('Helvetica-Bold')
               .fillColor(score >= 3 ? '#27ae60' : '#e74c3c')
               .text(`Status: ${score >= 3 ? 'LULUS 🎉' : 'TIDAK LULUS'}`, 100, yPosition, {
                   width: doc.page.width - 200,
                   align: 'center'
               });
            
            // Garis dekoratif bawah
            doc.strokeColor('#bdc3c7')
               .lineWidth(1)
               .moveTo(100, yPosition + 40)
               .lineTo(doc.page.width - 100, yPosition + 40)
               .stroke();
            
            // Footer
            yPosition += 80;
            const tanggal = now.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            doc.fontSize(10)
               .font('Helvetica')
               .fillColor('#7f8c8d')
               .text(`Tanggal: ${tanggal}`, 150, yPosition);
            
            doc.text(`ID Sertifikat: ${sertifikatId}`, doc.page.width - 250, yPosition);
            
            // Tanda tangan section
            yPosition += 60;
            doc.fontSize(10)
               .text('Direktur BPS', doc.page.width - 200, yPosition);
            
            doc.strokeColor('#7f8c8d')
               .lineWidth(1)
               .moveTo(doc.page.width - 200, yPosition + 40)
               .lineTo(doc.page.width - 100, yPosition + 40)
               .stroke();
            
            doc.text('Learning Management System', 150, yPosition);
            
            doc.strokeColor('#7f8c8d')
               .lineWidth(1)
               .moveTo(150, yPosition + 40)
               .lineTo(300, yPosition + 40)
               .stroke();
            
            // Watermark
            doc.fontSize(8)
               .fillColor('#ecf0f1')
               .text('Sertifikat Digital BPS - Dapat diverifikasi melalui sistem LMS', 
                     50, doc.page.height - 50, {
                         width: doc.page.width - 100,
                         align: 'center'
                     });
            
            // Finalize PDF
            doc.end();
            
            stream.on('finish', () => {
                console.log('Sertifikat PDF created:', filePath);
                resolve({
                    id: sertifikatId,
                    filePath: filePath,
                    filename: filename,
                    text: `Sertifikat ${pelatihan.nama} untuk ${nama}`,
                    tanggal: now.toISOString(),
                    pelatihanId: pelatihan.id,
                    namaPelatihan: pelatihan.nama,
                    score: score,
                    totalSoal: totalSoal,
                    persentase: persentase,
                    durasiPengerjaan: durasiPengerjaan
                });
            });
            
            stream.on('error', (error) => {
                console.error('Error creating PDF:', error);
                reject(error);
            });
            
        } catch (error) {
            console.error('Error in createSertifikatPDF:', error);
            reject(error);
        }
    });
};

// Fungsi untuk generate sertifikat (teks - fallback) - DIMODIFIKASI
const generateSertifikat = (nama, pelatihan, score, totalSoal, durasiPengerjaan) => {
    const now = new Date();
    const tanggal = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const sertifikatId = `SRT-${pelatihan.id}-${now.getTime()}`;
    
    let sertifikatText = `🎓 SERTIFIKAT KELULUSAN\n`;
    sertifikatText += `═══════════════════════════════\n\n`;
    sertifikatText += `Dengan ini menerangkan bahwa:\n\n`;
    sertifikatText += `Nama           : ${nama}\n`;
    sertifikatText += `Program        : ${pelatihan.nama}\n`;
    sertifikatText += `Durasi Pengerjaan : ${durasiPengerjaan}\n`; // DIUBAH
    sertifikatText += `Level          : ${pelatihan.level}\n`;
    sertifikatText += `Instruktur     : ${pelatihan.instruktur}\n\n`;
    sertifikatText += `Telah menyelesaikan program pelatihan dengan:\n`;
    sertifikatText += `Nilai Kuis: ${score}/${totalSoal}\n\n`;
    sertifikatText += `Status: LULUS 🎉\n\n`;
    sertifikatText += `Tanggal        : ${tanggal}\n`;
    sertifikatText += `ID Sertifikat : ${sertifikatId}\n\n`;
    sertifikatText += `═══════════════════════════════\n`;
    sertifikatText += `Badan Pusat Statistik\n`;
    sertifikatText += `Learning Management System\n\n`;
    sertifikatText += `*Sertifikat ini diterbitkan secara digital dan dapat diverifikasi*`;
    
    return {
        id: sertifikatId,
        text: sertifikatText,
        tanggal: now.toISOString(),
        pelatihanId: pelatihan.id,
        namaPelatihan: pelatihan.nama,
        score: score,
        totalSoal: totalSoal,
        durasiPengerjaan: durasiPengerjaan
    };
};

// ============================
module.exports = async (lenwy, m) => {
    const msg = m.messages[0];
    if (!msg.message) return;
    
    // IGNORE MESSAGES FROM BOT ITSELF
    if (msg.key.fromMe) return;

    // Mendapatkan teks dari pesan
    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const sender = msg.key.remoteJid;
    const pushname = msg.pushName || "Sobat BPS";
    const isCmd = body.startsWith(prefix);

    // Helper functions
    const lenwyreply = (teks) => lenwy.sendMessage(sender, { text: teks }, { quoted: msg });
    const isGroup = sender.endsWith('@g.us');
    const isAdmin = (admin && admin.includes) ? admin.includes(sender) : false;

    // ===== LOGIKA VERIFIKASI LMS =====
    // Handle non-command messages untuk flow verifikasi
    if (!isCmd) {
        let verifikasiData = loadVerifikasi();
        const userData = verifikasiData[sender];

        if (userData && userData.step) {
            console.log('Processing verification for:', sender, 'Step:', userData.step, 'Body:', body);
            
            // PERBAIKAN UTAMA: IGNORE EMPTY MESSAGES
            if (body.trim().length === 0) {
                console.log('Ignoring empty message from:', sender);
                return; // Jangan proses pesan kosong
            }
            
            if (userData.step === 1) {
                // Step 1: Menerima ID Sobat
                userData.id = body.trim();
                userData.step = 2;
                verifikasiData[sender] = userData;
                saveVerifikasi(verifikasiData);
                console.log('Saved ID:', userData.id, 'for sender:', sender);
                return lenwyreply("ID Sobat diterima. Sekarang masukkan Nama Lengkap Anda:");
            }
            
            if (userData.step === 2) {
                // Step 2: Menerima Nama dan Verifikasi
                userData.nama = body.trim();
                const validUsers = loadValidUsers();
                const found = validUsers.find(u => 
                    u.id === userData.id && u.nama.toLowerCase() === userData.nama.toLowerCase()
                );

                console.log('Verification attempt - ID:', userData.id, 'Nama:', userData.nama, 'Found:', !!found);

                if (found) {
                    // Verifikasi berhasil - lanjut ke step 3 (pemilihan pelatihan)
                    userData.step = 3;
                    userData.userVerified = found;
                    verifikasiData[sender] = userData;
                    saveVerifikasi(verifikasiData);
                    
                    let daftarPelatihan = `VERIFIKASI BERHASIL!\n\nSelamat datang, ${found.nama}!\n\n`;
                    daftarPelatihan += `DAFTAR PELATIHAN BPS YANG TERSEDIA:\n\n`;
                    
                    for (let i = 1; i <= Object.keys(pelatihanList).length; i++) {
                        const plth = pelatihanList[i];
                        daftarPelatihan += `${i}. ${plth.nama}\n`;
                        daftarPelatihan += `   Level: ${plth.level}\n\n`; // DURASI DIHAPUS
                    }
                    
                    daftarPelatihan += `Ketik angka (1-${Object.keys(pelatihanList).length}) untuk memilih pelatihan,\n`;
                    daftarPelatihan += `atau ketik ${prefix}pelatihan untuk kembali ke menu utama.`;
                    
                    return lenwyreply(daftarPelatihan);
                } else {
                    // Verifikasi gagal
                    delete verifikasiData[sender];
                    saveVerifikasi(verifikasiData);
                    
                    return lenwyreply(`VERIFIKASI GAGAL\n\nID Sobat BPS atau Nama tidak ditemukan.\n\nPastikan data benar:\n- ID: ${userData.id}\n- Nama: ${userData.nama}\n\nKetik ${prefix}pelatihan untuk coba lagi.`);
                }
            }
            
            if (userData.step === 3) {
                // Step 3: Pemilihan Pelatihan
                const pilihan = parseInt(body.trim());
                
                if (isNaN(pilihan) || pilihan < 1 || pilihan > Object.keys(pelatihanList).length) {
                    let errorMsg = `Pilihan tidak valid!\n\n`;
                    errorMsg += `Silakan ketik angka antara 1-${Object.keys(pelatihanList).length}:\n\n`;
                    
                    for (let i = 1; i <= Object.keys(pelatihanList).length; i++) {
                        errorMsg += `${i}. ${pelatihanList[i].nama}\n`;
                    }
                    
                    return lenwyreply(errorMsg);
                }
                
                const pelatihanTerpilih = pelatihanList[pilihan];
                
                // MULAI TRACKING WAKTU - TAMBAHKAN INI
                startTracking(sender, pelatihanTerpilih.id);
                
                // Simpan pilihan pelatihan dan lanjut ke step 4 (materi)
                userData.step = 4;
                userData.pelatihanTerpilih = pilihan;
                verifikasiData[sender] = userData;
                saveVerifikasi(verifikasiData);
                
                let detailPelatihan = `PENDAFTARAN PELATIHAN BERHASIL!\n\n`;
                detailPelatihan += `Halo ${userData.userVerified.nama},\n\n`;
                detailPelatihan += `Anda telah terdaftar dalam:\n\n`;
                detailPelatihan += `${pelatihanTerpilih.nama}\n`;
                detailPelatihan += `Kode: ${pelatihanTerpilih.id}\n`;
                detailPelatihan += `Level: ${pelatihanTerpilih.level}\n`;
                detailPelatihan += `Instruktur: ${pelatihanTerpilih.instruktur}\n\n`;
                detailPelatihan += `Deskripsi:\n${pelatihanTerpilih.deskripsi}\n\n`;
                detailPelatihan += `Materi Pembelajaran:\n`;
                
                pelatihanTerpilih.materi.forEach((materi, index) => {
                    detailPelatihan += `   ${index + 1}. ${materi}\n`;
                });
                
                // Tampilkan opsi materi
                detailPelatihan += `\n--- MATERI DOKUMEN & VIDEO ---\n`;
                detailPelatihan += `Ketik:\n`;
                detailPelatihan += `• ${prefix}pdf - Untuk download materi PDF\n`;
                detailPelatihan += `• ${prefix}video - Untuk download materi video\n`;
                detailPelatihan += `• ${prefix}kuis - Kerjakan kuis (Statistik Dasar)\n`;
                detailPelatihan += `• ${prefix}sertifikat - Lihat sertifikat Anda\n`;
                detailPelatihan += `• ${prefix}selesai - Untuk mengakhiri sesi\n\n`;
                detailPelatihan += `Status: Terdaftar\n`;
                detailPelatihan += `Waktu mulai: ${new Date().toLocaleString('id-ID')}\n`; // TAMBAHKAN WAKTU MULAI
                detailPelatihan += `Durasi pengerjaan akan dihitung otomatis dari akses materi sampai selesai kuis.`;
                
                return lenwyreply(detailPelatihan);
            }
            
            // STEP 5: Menangani pilihan file PDF/Video
            if (userData.step === 5 && userData.menuAktif) {
                const pilihan = parseInt(body.trim());
                const pelatihan = pelatihanList[userData.pelatihanTerpilih];
                let fileList, fileType;
                
                if (userData.menuAktif === 'pdf') {
                    fileList = pelatihan.materiFiles.pdf;
                    fileType = 'PDF';
                    
                    // CATAT WAKTU AKSES PDF - TAMBAHKAN INI
                    recordPdfAccess(sender, pelatihan.id);
                } else if (userData.menuAktif === 'video') {
                    fileList = pelatihan.materiFiles.video;
                    fileType = 'video';
                }
                
                if (!fileList || isNaN(pilihan) || pilihan < 1 || pilihan > fileList.length) {
                    let errorMsg = `Pilihan ${fileType} tidak valid!\n\n`;
                    errorMsg += `Silakan ketik angka antara 1-${fileList.length}:\n\n`;
                    
                    fileList.forEach((file, index) => {
                        errorMsg += `${index + 1}. ${file.nama}\n`;
                    });
                    
                    return lenwyreply(errorMsg);
                }
                
                const fileTerpilih = fileList[pilihan - 1];
                
                // Kirim file
                lenwyreply(`Mengirim ${fileType} "${fileTerpilih.nama}"...`);
                
                const result = await sendFile(
                    lenwy, 
                    sender, 
                    pelatihan.id,
                    fileTerpilih,
                    fileType,
                    msg
                );
                
                if (result.success) {
                    // Setelah berhasil mengirim PDF, tawarkan kuis untuk Statistik Dasar
                    if (pelatihan.id === "STATDAS" && userData.menuAktif === 'pdf') {
                        userData.step = 6; // Step untuk kuis
                        userData.kuis = {
                            currentSoal: 0,
                            score: 0,
                            wrongAnswers: 0
                        };
                        verifikasiData[sender] = userData;
                        saveVerifikasi(verifikasiData);
                        
                        // MULAI TRACKING KUIS - TAMBAHKAN INI
                        startQuizTracking(sender, pelatihan.id);
                        
                        setTimeout(() => {
                            // Mulai kuis dengan soal pertama
                            const soal = kuisStatistikDasar[0];
                            let kuisMsg = `📝 KUIS STATISTIK DASAR\n\n`;
                            kuisMsg += `Soal ${soal.nomor} dari 5:\n\n`;
                            kuisMsg += `${soal.soal}\n\n`;
                            kuisMsg += `Pilihan:\n`;
                            kuisMsg += `a. ${soal.pilihan.a}\n`;
                            kuisMsg += `b. ${soal.pilihan.b}\n`;
                            kuisMsg += `c. ${soal.pilihan.c}\n`;
                            kuisMsg += `d. ${soal.pilihan.d}\n\n`;
                            kuisMsg += `Ketik jawaban Anda (a, b, c, atau d):`;
                            
                            lenwyreply(kuisMsg);
                        }, 2000);
                    } else {
                        // Kembali ke menu materi untuk pelatihan lain
                        userData.step = 4;
                        delete userData.menuAktif;
                        verifikasiData[sender] = userData;
                        saveVerifikasi(verifikasiData);
                        
                        setTimeout(() => {
                            lenwyreply(`Download ${fileType} berhasil!\n\nKetik ${prefix}pdf atau ${prefix}video untuk materi lainnya, atau ${prefix}selesai untuk mengakhiri.`);
                        }, 2000);
                    }
                } else {
                    lenwyreply(`Gagal mengirim ${fileType}. Error: ${result.error}\n\nPastikan file "${fileTerpilih.filename}" ada di folder materi.`);
                }
                
                return;
            }
            
            // STEP 6: MENANGANI JAWABAN KUIS - PERBAIKAN ALUR
            if (userData.step === 6 && userData.kuis) {
                const jawaban = body.trim().toLowerCase();
                
                // Validasi jawaban
                if (!['a', 'b', 'c', 'd'].includes(jawaban)) {
                    return lenwyreply('❌ Jawaban harus a, b, c, atau d. Silakan coba lagi.');
                }
                
                const currentSoalIndex = userData.kuis.currentSoal;
                const soal = kuisStatistikDasar[currentSoalIndex];
                
                if (jawaban === soal.jawaban) {
                    // Jawaban BENAR - lanjut ke soal berikutnya
                    userData.kuis.score++;
                    userData.kuis.currentSoal++;
                    
                    // Cek apakah sudah selesai semua soal
                    if (userData.kuis.currentSoal >= kuisStatistikDasar.length) {
                        // KUIS SELESAI - Berikan sertifikat PDF
                        const score = userData.kuis.score;
                        const totalSoal = kuisStatistikDasar.length;
                        const pelatihan = pelatihanList[userData.pelatihanTerpilih];
                        
                        // HITUNG DURASI PENGERJAAN - TAMBAHKAN INI
                        const trackingResult = completeTracking(sender, pelatihan.id);
                        const durasiPengerjaan = trackingResult ? trackingResult.durationDisplay : "Tidak tercatat";
                        
                        try {
                            // Buat sertifikat PDF
                            lenwyreply(`🎉 Selamat! Kuis selesai. Membuat sertifikat PDF...`);
                            
                            const sertifikat = await createSertifikatPDF(
                                userData.userVerified.nama,
                                pelatihan,
                                score,
                                totalSoal,
                                durasiPengerjaan // TAMBAHKAN PARAMETER DURASI
                            );
                            
                            // Simpan sertifikat ke database
                            const semuaSertifikat = loadSertifikat();
                            if (!semuaSertifikat[sender]) {
                                semuaSertifikat[sender] = [];
                            }
                            semuaSertifikat[sender].push(sertifikat);
                            saveSertifikat(semuaSertifikat);
                            
                            // Kirim sertifikat PDF
                            const fileBuffer = fs.readFileSync(sertifikat.filePath);
                            await lenwy.sendMessage(sender, {
                                document: fileBuffer,
                                fileName: sertifikat.filename,
                                caption: `🎓 SERTIFIKAT KELULUSAN\n\nSelamat ${userData.userVerified.nama}!\n\nAnda telah menyelesaikan pelatihan ${pelatihan.nama} dengan:\n• Nilai: ${score}/${totalSoal}\n• Durasi Pengerjaan: ${durasiPengerjaan}\n\nSertifikat PDF terlampir. Simpan baik-baik!`
                            }, { quoted: msg });
                            
                            let hasilMsg = `🎉 KUIS SELESAI!\n\n`;
                            hasilMsg += `Nilai Anda: ${score}/${totalSoal}\n`;
                            hasilMsg += `Durasi Pengerjaan: ${durasiPengerjaan}\n\n`;
                            
                            if (score === totalSoal) {
                                hasilMsg += `SEMPURNA! 🏆\nAnda menguasai materi Statistik Dasar dengan sangat baik.\n\n`;
                            } else if (score >= 4) {
                                hasilMsg += `HEBAT! 👍\nPemahaman Anda tentang Statistik Dasar sudah baik.\n\n`;
                            } else if (score >= 3) {
                                hasilMsg += `CUKUP BAIK! 😊\nTeruslah berlatih untuk meningkatkan pemahaman.\n\n`;
                            } else {
                                hasilMsg += `JANGAN MENYERAH! 💪\nPelajari kembali materi dan coba lagi.\n\n`;
                            }
                            
                            // Kembali ke menu materi
                            userData.step = 4;
                            delete userData.kuis;
                            verifikasiData[sender] = userData;
                            saveVerifikasi(verifikasiData);
                            
                            hasilMsg += `Sertifikat PDF telah dikirim. Ketik ${prefix}pdf untuk materi lainnya, atau ${prefix}selesai untuk mengakhiri.`;
                            
                            return lenwyreply(hasilMsg);
                            
                        } catch (error) {
                            console.error('Error creating PDF sertifikat:', error);
                            // Fallback ke sertifikat teks jika PDF gagal
                            const sertifikat = generateSertifikat(
                                userData.userVerified.nama,
                                pelatihan,
                                score,
                                totalSoal,
                                durasiPengerjaan // TAMBAHKAN PARAMETER DURASI
                            );
                            
                            // Simpan sertifikat ke database
                            const semuaSertifikat = loadSertifikat();
                            if (!semuaSertifikat[sender]) {
                                semuaSertifikat[sender] = [];
                            }
                            semuaSertifikat[sender].push(sertifikat);
                            saveSertifikat(semuaSertifikat);
                            
                            let hasilMsg = `🎉 KUIS SELESAI!\n\n`;
                            hasilMsg += `Nilai Anda: ${score}/${totalSoal}\n`;
                            hasilMsg += `Durasi Pengerjaan: ${durasiPengerjaan}\n\n`;
                            hasilMsg += `📜 SERTIFIKAT ANDA:\n`;
                            hasilMsg += `${sertifikat.text}\n\n`;
                            hasilMsg += `Ketik ${prefix}pdf untuk materi lainnya, atau ${prefix}selesai untuk mengakhiri.`;
                            
                            // Kembali ke menu materi
                            userData.step = 4;
                            delete userData.kuis;
                            verifikasiData[sender] = userData;
                            saveVerifikasi(verifikasiData);
                            
                            return lenwyreply(hasilMsg);
                        }
                    } else {
                        // LANJUT KE SOAL BERIKUTNYA
                        verifikasiData[sender] = userData;
                        saveVerifikasi(verifikasiData);
                        
                        const nextSoal = kuisStatistikDasar[userData.kuis.currentSoal];
                        let nextSoalMsg = `✅ BENAR! +1 Poin\n\n`;
                        nextSoalMsg += `Soal ${nextSoal.nomor} dari 5:\n\n`;
                        nextSoalMsg += `${nextSoal.soal}\n\n`;
                        nextSoalMsg += `Pilihan:\n`;
                        nextSoalMsg += `a. ${nextSoal.pilihan.a}\n`;
                        nextSoalMsg += `b. ${nextSoal.pilihan.b}\n`;
                        nextSoalMsg += `c. ${nextSoal.pilihan.c}\n`;
                        nextSoalMsg += `d. ${nextSoal.pilihan.d}\n\n`;
                        nextSoalMsg += `Ketik jawaban Anda (a, b, c, atau d):`;
                        
                        return lenwyreply(nextSoalMsg);
                    }
                } else {
                    // Jawaban SALAH - ulang soal yang SAMA
                    userData.kuis.wrongAnswers = (userData.kuis.wrongAnswers || 0) + 1;
                    verifikasiData[sender] = userData;
                    saveVerifikasi(verifikasiData);
                    
                    let salahMsg = `❌ SALAH!\n\n`;
                    salahMsg += `Jawaban yang benar adalah: ${soal.jawaban.toUpperCase()}\n`;
                    salahMsg += `Penjelasan: ${soal.penjelasan}\n\n`;
                    salahMsg += `Coba lagi soal yang sama:\n\n`;
                    salahMsg += `Soal ${soal.nomor} dari 5:\n\n`;
                    salahMsg += `${soal.soal}\n\n`;
                    salahMsg += `Pilihan:\n`;
                    salahMsg += `a. ${soal.pilihan.a}\n`;
                    salahMsg += `b. ${soal.pilihan.b}\n`;
                    salahMsg += `c. ${soal.pilihan.c}\n`;
                    salahMsg += `d. ${soal.pilihan.d}\n\n`;
                    salahMsg += `Ketik jawaban Anda (a, b, c, atau d):`;
                    
                    return lenwyreply(salahMsg);
                }
            }
        }
        return; // Keluar jika bukan perintah dan tidak dalam sesi verifikasi
    }

    // ===== PROCESS COMMANDS =====
    const args = body.slice(1).trim().split(" ");
    const command = args.shift().toLowerCase();
    const q = args.join(" ");

    console.log('Command received:', command, 'from:', sender);

    // Cek jika image file ada
    let menuImage;
    try {
        if (fs.existsSync(image)) {
            menuImage = fs.readFileSync(image);
        }
    } catch (error) {
        console.error('Error loading menu image:', error);
    }

    // --- Perintah Utama ---
    switch (command) {
        // --- Informasi & Menu ---
        case "menu": {
            if (menuImage) {
                await lenwy.sendMessage(sender,
                    {
                        image: menuImage,
                        caption: `Halo ${pushname}! \n\n${lenwymenu}`,
                        mentions: [sender]
                    },
                    { quoted: msg }
                );
            } else {
                lenwyreply(`Halo ${pushname}! \n\n${lenwymenu}`);
            }
        }
        break

        case "admin": {
            if (!isAdmin) return lenwyreply("Bukan Admin Grup");
            lenwyreply("STATUS: ADMIN\nKamu memiliki akses penuh di bot ini.");
        }
        break

        case "group": {
            if (!isGroup) return lenwyreply(`COMMAND GAGAL\nPerintah ${prefix + command} hanya bisa digunakan di dalam grup.`);
            lenwyreply("STATUS: DALAM GRUP\nKamu sedang berada di dalam obrolan grup!");
        }
        break

        // ===== FITUR LMS BPS - MATERI DOKUMEN & VIDEO =====
        case "pdf": {
            let verifikasiData = loadVerifikasi();
            const userData = verifikasiData[sender];
            
            if (!userData || !userData.pelatihanTerpilih) {
                return lenwyreply(`Anda belum memilih pelatihan. Ketik ${prefix}pelatihan untuk memulai.`);
            }
            
            const pelatihan = pelatihanList[userData.pelatihanTerpilih];
            const pdfFiles = pelatihan.materiFiles.pdf;
            
            if (!pdfFiles || pdfFiles.length === 0) {
                return lenwyreply(`Tidak ada materi PDF untuk pelatihan ${pelatihan.nama}.`);
            }
            
            // Tampilkan daftar PDF
            let pdfList = `MATERI PDF - ${pelatihan.nama}\n\n`;
            pdfList += `Pilih PDF yang ingin didownload:\n\n`;
            
            pdfFiles.forEach((pdf, index) => {
                pdfList += `${index + 1}. ${pdf.nama}\n`;
                pdfList += `   ${pdf.deskripsi}\n\n`;
            });
            
            pdfList += `Ketik angka (1-${pdfFiles.length}) untuk download PDF, atau ${prefix}menu untuk kembali.`;
            
            // Simpan state untuk menunggu pilihan PDF
            userData.step = 5; // Step untuk memilih PDF
            userData.menuAktif = 'pdf';
            verifikasiData[sender] = userData;
            saveVerifikasi(verifikasiData);
            
            return lenwyreply(pdfList);
        }
        
        case "video": {
            let verifikasiData = loadVerifikasi();
            const userData = verifikasiData[sender];
            
            if (!userData || !userData.pelatihanTerpilih) {
                return lenwyreply(`Anda belum memilih pelatihan. Ketik ${prefix}pelatihan untuk memulai.`);
            }
            
            const pelatihan = pelatihanList[userData.pelatihanTerpilih];
            const videoFiles = pelatihan.materiFiles.video;
            
            if (!videoFiles || videoFiles.length === 0) {
                return lenwyreply(`Tidak ada materi video untuk pelatihan ${pelatihan.nama}.`);
            }
            
            // Tampilkan daftar video
            let videoList = `MATERI VIDEO - ${pelatihan.nama}\n\n`;
            videoList += `Pilih video yang ingin didownload:\n\n`;
            
            videoFiles.forEach((video, index) => {
                videoList += `${index + 1}. ${video.nama}\n`;
                videoList += `   ${video.deskripsi}\n`;
                videoList += `   Durasi: ${video.durasi}\n\n`;
            });
            
            videoList += `Ketik angka (1-${videoFiles.length}) untuk download video, atau ${prefix}menu untuk kembali.`;
            
            // Simpan state untuk menunggu pilihan video
            userData.step = 5; // Step untuk memilih video
            userData.menuAktif = 'video';
            verifikasiData[sender] = userData;
            saveVerifikasi(verifikasiData);
            
            return lenwyreply(videoList);
        }
        
        case "selesai": {
            let verifikasiData = loadVerifikasi();
            delete verifikasiData[sender];
            saveVerifikasi(verifikasiData);
            
            return lenwyreply(`Sesi pelatihan telah berakhir. Terima kasih telah belajar dengan LMS BPS!\n\nKetik ${prefix}pelatihan untuk mengakses pelatihan lainnya.`);
        }

        // ===== FITUR KUIS =====
        case "kuis": {
            let verifikasiData = loadVerifikasi();
            const userData = verifikasiData[sender];
            
            if (!userData || !userData.pelatihanTerpilih) {
                return lenwyreply(`Anda belum memilih pelatihan. Ketik ${prefix}pelatihan untuk memulai.`);
            }
            
            const pelatihan = pelatihanList[userData.pelatihanTerpilih];
            
            // Hanya tersedia untuk Statistik Dasar
            if (pelatihan.id !== "STATDAS") {
                return lenwyreply(`Kuis saat ini hanya tersedia untuk pelatihan Statistik Dasar.`);
            }
            
            // Mulai kuis
            userData.step = 6;
            userData.kuis = {
                currentSoal: 0,
                score: 0,
                wrongAnswers: 0
            };
            verifikasiData[sender] = userData;
            saveVerifikasi(verifikasiData);
            
            // MULAI TRACKING KUIS - TAMBAHKAN INI
            startQuizTracking(sender, pelatihan.id);
            
            const soal = kuisStatistikDasar[0];
            let kuisMsg = `📝 KUIS STATISTIK DASAR\n\n`;
            kuisMsg += `Soal ${soal.nomor} dari 5:\n\n`;
            kuisMsg += `${soal.soal}\n\n`;
            kuisMsg += `Pilihan:\n`;
            kuisMsg += `a. ${soal.pilihan.a}\n`;
            kuisMsg += `b. ${soal.pilihan.b}\n`;
            kuisMsg += `c. ${soal.pilihan.c}\n`;
            kuisMsg += `d. ${soal.pilihan.d}\n\n`;
            kuisMsg += `Ketik jawaban Anda (a, b, c, atau d):`;
            
            return lenwyreply(kuisMsg);
        }

        // ===== FITUR SERTIFIKAT =====
        case "sertifikat": {
            const semuaSertifikat = loadSertifikat();
            const sertifikatUser = semuaSertifikat[sender] || [];
            
            if (sertifikatUser.length === 0) {
                return lenwyreply(`Anda belum memiliki sertifikat.\n\nSelesaikan kuis pelatihan untuk mendapatkan sertifikat.`);
            }
            
            let sertifikatMsg = `📜 DAFTAR SERTIFIKAT ANDA\n\n`;
            
            sertifikatUser.forEach((sertif, index) => {
                sertifikatMsg += `${index + 1}. ${sertif.namaPelatihan}\n`;
                sertifikatMsg += `   Nilai: ${sertif.score}/${sertif.totalSoal}\n`;
                sertifikatMsg += `   Durasi: ${sertif.durasiPengerjaan || 'Tidak tercatat'}\n`; // TAMBAHKAN DURASI
                sertifikatMsg += `   Tanggal: ${new Date(sertif.tanggal).toLocaleDateString('id-ID')}\n`;
                sertifikatMsg += `   ID: ${sertif.id}\n\n`;
            });
            
            sertifikatMsg += `Ketik ${prefix}pelatihan untuk mengikuti pelatihan lainnya.`;
            
            return lenwyreply(sertifikatMsg);
        }

        // ===== FITUR BARU: CEK DURASI =====
        case "durasi":
        case "waktu": {
            let verifikasiData = loadVerifikasi();
            const userData = verifikasiData[sender];
            
            if (!userData || !userData.pelatihanTerpilih) {
                return lenwyreply(`Anda belum memilih pelatihan. Ketik ${prefix}pelatihan untuk memulai.`);
            }
            
            const pelatihan = pelatihanList[userData.pelatihanTerpilih];
            const trackingInfo = getDuration(sender, pelatihan.id);
            
            if (!trackingInfo) {
                return lenwyreply(`Belum ada data tracking untuk pelatihan ${pelatihan.nama}.`);
            }
            
            let durasiMsg = `⏱️ TRACKING WAKTU PENGERJAAN\n\n`;
            durasiMsg += `Pelatihan: ${pelatihan.nama}\n`;
            
            if (trackingInfo.startTime) {
                const start = new Date(trackingInfo.startTime);
                durasiMsg += `Waktu Mulai: ${start.toLocaleString('id-ID')}\n`;
            }
            
            if (trackingInfo.pdfAccessTime) {
                const pdfTime = new Date(trackingInfo.pdfAccessTime);
                durasiMsg += `Akses Materi: ${pdfTime.toLocaleString('id-ID')}\n`;
            }
            
            if (trackingInfo.quizStartTime) {
                const quizStart = new Date(trackingInfo.quizStartTime);
                durasiMsg += `Mulai Kuis: ${quizStart.toLocaleString('id-ID')}\n`;
            }
            
            if (trackingInfo.quizEndTime) {
                const quizEnd = new Date(trackingInfo.quizEndTime);
                durasiMsg += `Selesai Kuis: ${quizEnd.toLocaleString('id-ID')}\n`;
            }
            
            if (trackingInfo.totalDuration) {
                durasiMsg += `Durasi Total: ${trackingInfo.durationDisplay}\n`;
            } else {
                const currentTime = new Date();
                const startTime = new Date(trackingInfo.startTime);
                const durationMs = currentTime - startTime;
                const durationMinutes = Math.floor(durationMs / (1000 * 60));
                const durationHours = Math.floor(durationMinutes / 60);
                const remainingMinutes = durationMinutes % 60;
                
                const currentDuration = durationHours > 0 
                    ? `${durationHours} jam ${remainingMinutes} menit`
                    : `${durationMinutes} menit`;
                    
                durasiMsg += `Durasi Saat Ini: ${currentDuration}\n`;
            }
            
            return lenwyreply(durasiMsg);
        }

        // ===== FITUR LMS BPS - PILIHAN PELATIHAN =====
        case "pelatihan": 
        case "training": 
        case "lms": {
            // Mulai proses verifikasi - step 1: minta ID
            let verifikasiData = loadVerifikasi();
            verifikasiData[sender] = { 
                step: 1, // Step 1: minta ID
                startTime: new Date().toISOString()
            };
            saveVerifikasi(verifikasiData);
            
            console.log('Started verification for:', sender);
            return lenwyreply("VERIFIKASI AKSES LMS BPS\n\nUntuk mengakses daftar pelatihan, Anda harus melakukan verifikasi.\n\nSilahkan ketik dan kirimkan ID Sobat BPS Anda:");
        }

        // --- Perintah Bantuan ---
        case "help":
        case "bantuan": {
            lenwyreply(`BANTUAN CHATBOT LMS BPS

Perintah yang tersedia:
• ${prefix}menu - Menu utama
• ${prefix}pelatihan - Akses pelatihan BPS
• ${prefix}pdf - Download materi PDF
• ${prefix}video - Download materi video
• ${prefix}kuis - Kerjakan kuis (Statistik Dasar)
• ${prefix}sertifikat - Lihat sertifikat Anda
• ${prefix}durasi - Cek durasi pengerjaan
• ${prefix}selesai - Akhiri sesi pelatihan

Untuk bantuan teknis, hubungi admin.`);
        }
        break;
        
        // Default
        default: { 
            lenwyreply(`Perintah "${prefix + command}" tidak ditemukan. 
Ketik ${prefix}menu untuk melihat daftar perintah yang tersedia.`);
        }
    }
}