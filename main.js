document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Job Detail Panel JS (if any) ---
    // (Keep your existing job detail panel code here)
    // Example:
    // const jobDetailPanel = document.getElementById('jobDetailPanel');
    // const closeDetailPanelButton = document.getElementById('closeDetailPanel');
    // const jobCards = document.querySelectorAll('.job-card');

    // --- New Modal Ajukan Bimbingan JS ---
    const ajukanBimbinganBtn = document.querySelector('.ajukan-bimbingan-btn');
    const ajukanBimbinganModal = document.getElementById('ajukanBimbinganModal');
    const closeAjukanModalButton = ajukanBimbinganModal.querySelector('.close-button');
    const cancelModalButton = ajukanBimbinganModal.querySelector('.cancel-modal-btn');
    const submitAjuanForm = document.getElementById('ajukanBimbinganForm');

    // Reuse the existing overlay or create a new one if structure requires
    const overlay = document.getElementById('modalOverlay'); // Make sure this ID matches your overlay HTML

    // Function to open the modal
    function openAjukanBimbinganModal() {
        ajukanBimbinganModal.classList.add('show-modal');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent body scrolling
    }

    // Function to close the modal
    function closeAjukanBimbinganModal() {
        ajukanBimbinganModal.classList.remove('show-modal');
        overlay.classList.remove('visible');
        document.body.style.overflow = ''; // Allow body scrolling
    }

    // Event listener for "Ajukan Bimbingan" button
    if (ajukanBimbinganBtn) {
        ajukanBimbinganBtn.addEventListener('click', openAjukanBimbinganModal);
    }

    // Event listener for close button (x) in modal header
    if (closeAjukanModalButton) {
        closeAjukanModalButton.addEventListener('click', closeAjukanBimbinganModal);
    }

    // Event listener for "Batal" button in modal footer
    if (cancelModalButton) {
        cancelModalButton.addEventListener('click', closeAjukanBimbinganModal);
    }

    // Event listener for clicking outside the modal content (on the overlay)
    if (overlay) {
        overlay.addEventListener('click', (event) => {
            // Check if the click occurred directly on the overlay, not on the modal content
            if (event.target === overlay && ajukanBimbinganModal.classList.contains('show-modal')) {
                 closeAjukanBimbinganModal();
            }
        });
    }

    // Event listener for form submission (for actual submission, this would go to a server)
    if (submitAjuanForm) {
        submitAjuanForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            // Lakukan sesuatu dengan data form di sini, misal:
            const tanggal = document.getElementById('tanggalBimbingan').value;
            const waktu = document.getElementById('waktuBimbingan').value;
            const topik = document.getElementById('topikBimbingan').value;
            const catatan = document.getElementById('catatanTambahan').value;

            console.log("Mengajukan Bimbingan:");
            console.log("Tanggal:", tanggal);
            console.log("Waktu:", waktu);
            console.log("Topik:", topik);
            console.log("Catatan:", catatan);

            // Setelah pengajuan berhasil (misalnya setelah AJAX request sukses)
            alert('Ajuan Bimbingan berhasil dikirim!'); // Contoh notifikasi
            closeAjukanBimbinganModal(); // Tutup modal setelah submit
            submitAjuanForm.reset(); // Reset form fields
        });
    }

    // You might also want to close the modal if the user presses the Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && ajukanBimbinganModal.classList.contains('show-modal')) {
            closeAjukanBimbinganModal();
        }
    });

     // --- New JS for Laporan Akhir Magang (File Upload) ---
    const laporanFile = document.getElementById('laporanFile');
    const fileUploadBox = document.querySelector('.file-upload-box');
    const uploadedFileInfo = document.querySelector('.uploaded-file-info');
    const uploadedFileName = uploadedFileInfo.querySelector('.file-name');
    const deleteFileIcon = uploadedFileInfo.querySelector('.delete-file-icon');
    const uploadButton = document.querySelector('.upload-button');

    // Function to handle file selection
    function handleFileSelect(file) {
        if (file) {
            uploadedFileName.textContent = file.name;
            uploadedFileInfo.style.display = 'flex'; // Show file info
            fileUploadBox.style.display = 'none'; // Hide upload box
            uploadButton.style.display = 'block'; // Ensure upload button is visible
        } else {
            // No file selected or file was cleared
            uploadedFileInfo.style.display = 'none';
            uploadedFileName.textContent = '';
            fileUploadBox.style.display = 'flex'; // Show upload box again
            uploadButton.style.display = 'none'; // Hide upload button if no file
        }
    }

    // Event listener for hidden file input change
    if (laporanFile) {
        laporanFile.addEventListener('change', (event) => {
            handleFileSelect(event.target.files[0]);
        });
    }

    // Event listener for delete file icon
    if (deleteFileIcon) {
        deleteFileIcon.addEventListener('click', () => {
            laporanFile.value = null; // Clear the input value
            handleFileSelect(null); // Reset UI
        });
    }

    // Event listener for the main "Upload" button
    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            if (laporanFile.files.length > 0) {
                const fileToUpload = laporanFile.files[0];
                console.log('Mengunggah file:', fileToUpload.name, 'Ukuran:', fileToUpload.size, 'tipe:', fileToUpload.type);

                // Di sini Anda akan menambahkan logika untuk mengirim file ke server
                // Biasanya menggunakan FormData dan Fetch API
                /*
                const formData = new FormData();
                formData.append('laporanAkhir', fileToUpload);

                fetch('/api/upload-laporan-akhir', {
                    method: 'POST',
                    body: formData,
                    // Tidak perlu mengatur 'Content-Type' untuk FormData, browser akan melakukannya
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Upload Berhasil:', data);
                    alert('Laporan akhir berhasil diunggah!');
                    laporanFile.value = null; // Clear input
                    handleFileSelect(null); // Reset UI
                })
                .catch(error => {
                    console.error('Error saat mengunggah:', error);
                    alert('Terjadi kesalahan saat mengunggah laporan.');
                });
                */

                alert(`File "${fileToUpload.name}" berhasil diunggah! (Ini hanya simulasi)`);
                laporanFile.value = null; // Clear input for next upload
                handleFileSelect(null); // Reset UI after successful (simulated) upload
            } else {
                alert('Pilih file PDF terlebih dahulu.');
            }
        });
    }

    // NEW: Event listener for the "Kirim" button
    if (submitFileButton) {
        submitFileButton.addEventListener('click', () => {
            if (laporanFile.files.length > 0) {
                const fileToSubmit = laporanFile.files[0];
                console.log('Mengirim file final:', fileToSubmit.name);

                // Di sini Anda akan menambahkan logika untuk mengirim file FINAL ke server
                // Ini bisa jadi proses yang sama dengan "Upload" jika "Upload" hanya preview,
                // atau mengirim ID file yang sudah diunggah sebelumnya.
                /*
                const formData = new FormData();
                formData.append('laporanAkhirFinal', fileToSubmit);

                fetch('/api/kirim-laporan-akhir', { // Endpoint yang berbeda untuk finalisasi
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Kirim Laporan Berhasil:', data);
                    alert('Laporan akhir berhasil dikirim!');
                    laporanFile.value = null; // Clear input
                    handleFileSelect(null); // Reset UI
                })
                .catch(error => {
                    console.error('Error saat mengirim laporan:', error);
                    alert('Terjadi kesalahan saat mengirim laporan.');
                });
                */

                alert(`Laporan akhir "${fileToSubmit.name}" berhasil dikirim! (Ini hanya simulasi pengiriman final)`);
                laporanFile.value = null; // Clear input after final submission
                handleFileSelect(null); // Reset UI
            } else {
                alert('Pilih file PDF terlebih dahulu untuk dikirim.');
            }
        });
    }

    // --- Optional: Drag and Drop functionality ---
    if (fileUploadBox) {
        fileUploadBox.addEventListener('dragover', (event) => {
            event.preventDefault(); // Mencegah perilaku default (membuka file)
            fileUploadBox.style.borderColor = 'var(--primary-green)'; // Visual feedback
            fileUploadBox.style.backgroundColor = '#e6f5f4';
        });

        fileUploadBox.addEventListener('dragleave', () => {
            fileUploadBox.style.borderColor = 'var(--border-color)';
            fileUploadBox.style.backgroundColor = '#fff';
        });

        fileUploadBox.addEventListener('drop', (event) => {
            event.preventDefault();
            fileUploadBox.style.borderColor = 'var(--border-color)';
            fileUploadBox.style.backgroundColor = '#fff';

            const files = event.dataTransfer.files;
            if (files.length > 0 && files[0].type === 'application/pdf') {
                laporanFile.files = files; // Assign dropped file to the hidden input
                handleFileSelect(files[0]);
            } else {
                alert('Hanya file PDF yang diizinkan!');
            }
        });
    }

    // --- Sidebar Submenu Toggle JS ---
    // This will handle the dropdown for "Laporan Magang"
    const navItemsWithSubmenu = document.querySelectorAll('.main-nav .nav-item.has-submenu');

    navItemsWithSubmenu.forEach(item => {
        const anchor = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        const expandIcon = item.querySelector('.expand-icon');

        if (anchor && submenu && expandIcon) {
            anchor.addEventListener('click', (event) => {
                // Prevent default link behavior if it's a menu toggle
                // Only prevent if submenu exists directly under this item
                if (item.classList.contains('has-submenu')) {
                     event.preventDefault();
                }
               
                // Toggle active class on the parent item
                item.classList.toggle('active');

                // Toggle submenu visibility
                if (submenu.classList.contains('active-submenu')) {
                    submenu.classList.remove('active-submenu');
                    submenu.style.maxHeight = '0';
                    expandIcon.textContent = 'expand_more'; // Change icon to expand_more
                } else {
                    // Close other open submenus first
                    navItemsWithSubmenu.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherSubmenu = otherItem.querySelector('.submenu');
                            const otherExpandIcon = otherItem.querySelector('.expand-icon');
                            if (otherSubmenu) {
                                otherSubmenu.classList.remove('active-submenu');
                                otherSubmenu.style.maxHeight = '0';
                            }
                            if (otherExpandIcon) {
                                otherExpandIcon.textContent = 'expand_more';
                            }
                        }
                    });

                    submenu.classList.add('active-submenu');
                    submenu.style.maxHeight = submenu.scrollHeight + 'px'; // Set height based on content
                    expandIcon.textContent = 'expand_less'; // Change icon to expand_less
                }
            });
        }
    });

    // Ensure the current active submenu item is highlighted on page load (if applicable)
    // This needs to be handled if you have specific logic for page navigation
    const activeSubmenuItem = document.querySelector('.submenu-item.active');
    if (activeSubmenuItem) {
        const parentNavItem = activeSubmenuItem.closest('.nav-item.has-submenu');
        if (parentNavItem) {
            parentNavItem.classList.add('active');
            const submenu = parentNavItem.querySelector('.submenu');
            const expandIcon = parentNavItem.querySelector('.expand-icon');
            if (submenu) {
                submenu.classList.add('active-submenu');
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
            }
            if (expandIcon) {
                expandIcon.textContent = 'expand_less';
            }
        }
    }

    // --- Penilaian Mahasiswa ---
    const kirimPenilaianBtn = document.querySelector('.kirim-penilaian-btn');
    const penilaianTextarea = document.querySelector('.form-penilaian-section textarea');
    const nilaiInputs = document.querySelectorAll('.form-penilaian-section input[type="number"]');

    if (kirimPenilaianBtn) {
        kirimPenilaianBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Mencegah submit form default

            const penilaianData = {
                namaMahasiswa: document.querySelector('.student-info p:nth-child(1) span').textContent,
                periodeMagang: document.querySelector('.student-info p:nth-child(2) span').textContent,
                kriteria: {},
                saran: penilaianTextarea ? penilaianTextarea.value.trim() : ''
            };

            let allInputsValid = true;
            nilaiInputs.forEach(input => {
                const aspek = input.closest('tr').querySelector('td:first-child').textContent.trim();
                const nilai = parseInt(input.value);

                if (isNaN(nilai) || nilai < 1 || nilai > 100) {
                    alert(`Nilai untuk ${aspek} harus antara 1 dan 100.`);
                    input.focus();
                    allInputsValid = false;
                    return; // Stop current iteration
                }
                penilaianData.kriteria[aspek] = nilai;
            });

            if (!allInputsValid) {
                return; // Stop submission if inputs are not valid
            }

            console.log("Data Penilaian:", penilaianData);

            // Di sini Anda akan menambahkan logika untuk mengirim data ke server (backend)
            /*
            fetch('/api/submit-penilaian', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(penilaianData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Penilaian Berhasil Dikirim:', data);
                alert('Penilaian berhasil dikirim!');
                // Reset form setelah berhasil
                nilaiInputs.forEach(input => input.value = '');
                if (penilaianTextarea) {
                    penilaianTextarea.value = '';
                }
            })
            .catch(error => {
                console.error('Error saat mengirim penilaian:', error);
                alert('Terjadi kesalahan saat mengirim penilaian.');
            });
            */

            alert('Penilaian berhasil dikirim! (Data ditampilkan di console)');
            // Reset form setelah simulasi berhasil
            nilaiInputs.forEach(input => input.value = '');
            if (penilaianTextarea) {
                penilaianTextarea.value = '';
            }
        });
    }

    // --- New JS for Cetak Sertifikat ---
    const downloadPdfBtn = document.querySelector('.download-pdf-btn');
    const cetakSertifikatBtn = document.querySelector('.cetak-sertifikat-btn');

    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            // Dalam aplikasi nyata, ini akan memicu download file PDF sertifikat
            // Misalnya: window.open('/api/download-sertifikat?id=YOUR_SERTIFIKAT_ID', '_blank');
            // Atau jika sertifikat sudah diunggah, Anda bisa langsung mengunduhnya:
            // const pdfUrl = 'path/to/your/sertifikat.pdf';
            // const a = document.createElement('a');
            // a.href = pdfUrl;
            // a.download = 'Sertifikat_Magang.pdf';
            // document.body.appendChild(a);
            // a.click();
            // document.body.removeChild(a);

            alert('Fitur Download PDF Sertifikat sedang dikembangkan!');
            console.log('Download PDF Sertifikat diklik.');
        });
    }

    if (cetakSertifikatBtn) {
        cetakSertifikatBtn.addEventListener('click', () => {
            // Dalam aplikasi nyata, ini akan memicu fungsi cetak browser
            // Jika ada iframe dengan PDF:
            // const iframe = document.getElementById('sertifikatIframe'); // Contoh ID iframe
            // if (iframe) {
            //     iframe.contentWindow.print();
            // } else {
            //     window.print(); // Cetak seluruh halaman jika tidak ada pratinjau spesifik
            // }

            alert('Fitur Cetak Sertifikat fisik sedang dikembangkan!');
            console.log('Cetak Sertifikat fisik diklik.');
        });
    }

    // --- (Your existing job detail panel JS continues here) ---
});