// script.js

// Fungsi untuk mengubah mode terang/gela
function toggleDarkMode() {
    const body = document.body;
    const button = document.getElementById('dark-mode-button');
    
    // Toggle kelas 'dark' pada body
    body.classList.toggle('dark');
    button.classList.toggle('dark'); // Ganti warna tombol sesuai dengan mode
    
    // Simpan preferensi mode pengguna ke localStorage
    if (body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
    } else {
        localStorage.setItem('mode', 'light');
    }
}

// Menambahkan event listener pada tombol untuk mengubah mode
const darkModeButton = document.getElementById('dark-mode-button');
darkModeButton.addEventListener('click', toggleDarkMode);

// Cek preferensi mode pengguna saat halaman dimuat
window.addEventListener('load', () => {
    if (localStorage.getItem('mode') === 'dark') {
        document.body.classList.add('dark');
        darkModeButton.classList.add('dark');
    } else {
        document.body.classList.add('light');
    }
});

// Fungsi untuk menampilkan waktu dan sapaan
function displayTimeAndGreeting() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const timeString = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    // Menentukan sapaan berdasarkan waktu
    let greeting = '';
    if (hours >= 5 && hours < 10) {
        greeting = 'Selamat Pagi!';
    } else if (hours >= 10 && hours < 15) {
        greeting = 'Selamat Siang!';
    } else if (hours >= 15 && hours < 18) {
        greeting = 'Selamat Sore!';
    } else {
        greeting = 'Selamat Malam!';
    }
    
    // Menampilkan waktu dan sapaan pada elemen dengan id "greeting-time"
    const greetingElement = document.getElementById('greeting-time');
    greetingElement.innerHTML = `${greeting} Waktu Sekarang: ${timeString}`;
}

// Update waktu setiap detik
setInterval(displayTimeAndGreeting, 1000);

// Memanggil pertama kali untuk menampilkan waktu segera setelah halaman dimuat
displayTimeAndGreeting();

// Gauge Chart untuk Heart Rate
var ctxHeartRate = document.getElementById('heart-rate-gauge-chart').getContext('2d');
var heartRateGaugeChart = new Chart(ctxHeartRate, {
    type: 'doughnut',
    data: {
        labels: ['Heart Rate'],
        datasets: [{
            label: 'Heart Rate',
            data: [70, 130],  // Misalnya, Heart rate: 70-130 bpm
            backgroundColor: ['#4CAF50', '#ddd'],  // Hijau untuk data aktual, abu-abu untuk sisa
            borderWidth: 5,
            circumference: Math.PI,
            rotation: -Math.PI,
            cutoutPercentage: 80
        }]
    },
    options: {
        responsive: true,
        rotation: Math.PI,
        circumference: Math.PI,
        animation: {
            animateRotate: true,
            animateScale: true
        },
        tooltips: {
            enabled: false
        }
    }
});

// Gauge Chart untuk SpO2
var ctxSpO2 = document.getElementById('spo2-gauge-chart').getContext('2d');
var spo2GaugeChart = new Chart(ctxSpO2, {
    type: 'doughnut',
    data: {
        labels: ['SpO2'],
        datasets: [{
            label: 'SpO2',
            data: [80, 100],  // Misalnya, SpO2: 80-100%
            backgroundColor: ['#2196F3', '#ddd'],  // Biru untuk data aktual, abu-abu untuk sisa
            borderWidth: 5,
            circumference: Math.PI,
            rotation: -Math.PI,
            cutoutPercentage: 80
        }]
    },
    options: {
        responsive: true,
        rotation: Math.PI,
        circumference: Math.PI,
        animation: {
            animateRotate: true,
            animateScale: true
        },
        tooltips: {
            enabled: false
        }
    }
});

// Gauge Chart untuk Temperature
var ctxTemperature = document.getElementById('temperature-gauge-chart').getContext('2d');
var temperatureGaugeChart = new Chart(ctxTemperature, {
    type: 'doughnut',
    data: {
        labels: ['Temperature'],
        datasets: [{
            label: 'Temperature',
            data: [36, 40],  // Misalnya, 36-40°C
            backgroundColor: ['#FF5722', '#ddd'],  // Merah untuk data aktual, abu-abu untuk sisa
            borderWidth: 5,
            circumference: Math.PI,
            rotation: -Math.PI,
            cutoutPercentage: 80
        }]
    },
    options: {
        responsive: true,
        rotation: Math.PI,
        circumference: Math.PI,
        animation: {
            animateRotate: true,
            animateScale: true
        },
        tooltips: {
            enabled: false
        }
    }
});

// Mendapatkan semua tombol aktuator
const actuatorButtons = document.querySelectorAll('.actuator-btn');

// Menambahkan event listener untuk setiap tombol
actuatorButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const actuatorId = index + 1; // Aktuator ID sesuai urutan
        toggleActuatorStatus(actuatorId); // Panggil fungsi toggle
    });
});

// Fungsi untuk toggle status
function toggleActuatorStatus(actuatorId) {
    // Mengambil elemen lingkaran status, teks status, dan tombol
    const statusCircle = document.getElementById(`status-circle-${actuatorId}`);
    const statusText = document.getElementById(`status-text-${actuatorId}`);
    const button = document.getElementById(`actuator-${actuatorId}`);
    
    // Jika status saat ini adalah Online
    if (statusCircle.classList.contains('bg-green-500')) {
        // Ubah ke Offline
        statusCircle.classList.remove('bg-green-500');
        statusCircle.classList.add('bg-red-500');
        statusText.classList.remove('text-green-500');
        statusText.classList.add('text-red-500');
        statusText.textContent = 'Offline';
        
        // Ubah warna tombol ke abu-abu
        button.classList.remove('bg-green-500');
        button.classList.add('bg-gray-500');
    } else {
        // Ubah ke Online
        statusCircle.classList.remove('bg-red-500');
        statusCircle.classList.add('bg-green-500');
        statusText.classList.remove('text-red-500');
        statusText.classList.add('text-green-500');
        statusText.textContent = 'Online';
        
        // Ubah warna tombol ke hijau
        button.classList.remove('bg-gray-500');
        button.classList.add('bg-green-500');
    }
}
