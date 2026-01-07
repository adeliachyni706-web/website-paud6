// Fungsi untuk navigasi antar halaman
document.addEventListener('DOMContentLoaded', function() {
    // Elemen navigasi
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const pageIndicator = document.getElementById('pageIndicator');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    // Fungsi untuk menampilkan halaman yang dipilih
    function showPage(pageId) {
        // Sembunyikan semua halaman
        pages.forEach(page => {
            page.style.display = 'none';
        });
        
        // Tampilkan halaman yang dipilih
        const activePage = document.getElementById(pageId);
        activePage.style.display = 'block';
        
        // Update navigasi aktif
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${pageId}`) {
                link.classList.add('active');
            }
        });
        
        // Update indikator halaman
        let pageName = 'Beranda';
        switch(pageId) {
            case 'layanan': pageName = 'Layanan'; break;
            case 'kontak': pageName = 'Kontak'; break;
            case 'tentang': pageName = 'Tentang Kami'; break;
        }
        pageIndicator.textContent = `Halaman: ${pageName}`;
        
        // Tambah animasi
        activePage.classList.remove('fade-in');
        void activePage.offsetWidth; // Trigger reflow
        activePage.classList.add('fade-in');
        
        // Tutup menu mobile jika terbuka
        if (window.innerWidth <= 768) {
            mainNav.classList.remove('active');
        }
        
        // Jika di halaman beranda, tambahkan efek khusus untuk video
        if (pageId === 'beranda') {
            initializeVideoSection();
        }
    }
    
    // Event listener untuk navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
            
            // Scroll ke atas halaman
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Toggle menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
    
    // Form kontak
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil data dari form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validasi sederhana
            if (!name || !email || !subject || !message) {
                alert('Harap lengkapi semua field yang diperlukan.');
                return;
            }
            
            // Tampilkan pesan sukses
            alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera melalui email ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Fungsi untuk memutar audio
    window.playAudio = function(index) {
        const audioElements = document.querySelectorAll('audio');
        if (audioElements[index]) {
            // Hentikan semua audio lainnya
            audioElements.forEach(audio => {
                if (audio !== audioElements[index]) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
            
            // Putar audio yang dipilih
            audioElements[index].play();
        }
    };
    
    // Inisialisasi bagian video di halaman beranda
    function initializeVideoSection() {
        // Tambahkan efek hover ke kontainer video
        const videoContainers = document.querySelectorAll('.video-container');
        videoContainers.forEach(container => {
            container.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 12px 20px rgba(0,0,0,0.2)';
            });
            
            container.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            });
        });
        
        // Tambahkan efek klik ke kategori video
        const categoryTags = document.querySelectorAll('.category-tag');
        categoryTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Fitur kategori video akan segera hadir!');
            });
        });
        
        // Tambahkan animasi saat video dimuat
        const videoIframes = document.querySelectorAll('.video-player iframe');
        videoIframes.forEach((iframe, index) => {
            iframe.addEventListener('load', function() {
                console.log(`Video ${index + 1} berhasil dimuat`);
                // Tambahkan indikator video siap diputar
                const container = iframe.closest('.video-container');
                if (container) {
                    const title = container.querySelector('.video-title');
                    if (title) {
                        const playIcon = document.createElement('i');
                        playIcon.className = 'fas fa-play-circle';
                        playIcon.style.marginLeft = '10px';
                        playIcon.style.color = 'var(--primary)';
                        playIcon.style.fontSize = '0.9em';
                        title.appendChild(playIcon);
                    }
                }
            });
        });
    }
    
    // Tambahkan efek hover ke tombol materi
    const materialButtons = document.querySelectorAll('.material-card .btn');
    materialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Simulasikan loading konten audio
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('loadeddata', function() {
            console.log('Audio berhasil dimuat: ', this.src);
        });
        
        audio.addEventListener('error', function() {
            console.log('Gagal memuat audio: ', this.src);
            // Fallback untuk audio yang gagal dimuat
            const parentDiv = this.closest('.audio-player');
            if (parentDiv) {
                const errorMsg = document.createElement('p');
                errorMsg.textContent = 'Audio tidak tersedia. Silakan coba lagi nanti.';
                errorMsg.style.color = 'red';
                errorMsg.style.fontSize = '0.9rem';
                parentDiv.appendChild(errorMsg);
            }
        });
    });
    
    // Tampilkan halaman beranda secara default
    showPage('beranda');
    
    // Deteksi perubahan ukuran layar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
        }
    });
    
    // Animasi untuk kartu materi saat dimuat
    const materialCards = document.querySelectorAll('.material-card');
    materialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Animasi untuk kontainer video saat dimuat
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach((container, index) => {
        container.style.animationDelay = `${index * 0.15 + 0.4}s`;
        container.classList.add('fade-in');
    });
});