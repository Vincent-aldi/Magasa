document.addEventListener('DOMContentLoaded', () => {
  const jobDetailPanel = document.getElementById("jobDetailPanel");
  const closeDetailPanelButton = document.getElementById("closeDetailPanel");
  const jobCards = document.querySelectorAll(".job-card");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  function openJobDetailPanel() {
    jobDetailPanel.classList.add("open");
    overlay.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeJobDetailPanel() {
    jobDetailPanel.classList.remove("open");
    overlay.classList.remove("visible");
    document.body.style.overflow = "";
  }

  if (closeDetailPanelButton) {
    closeDetailPanelButton.addEventListener("click", closeJobDetailPanel);
  }

  overlay.addEventListener("click", closeJobDetailPanel);

  jobCards.forEach((card) => {
    card.addEventListener("click", () => {
      openJobDetailPanel();
      const title = card.querySelector('.job-title').textContent;
    });
  });

  // Modal Ajukan Bimbingan JS
  const ajukanBimbinganBtn = document.querySelector(".ajukan-bimbingan-btn");
  const ajukanBimbinganModal = document.getElementById("ajukanBimbinganModal");
  const closeAjukanModalButton =
    ajukanBimbinganModal.querySelector(".close-button");
  const cancelModalButton =
    ajukanBimbinganModal.querySelector(".cancel-modal-btn");
  const submitAjuanForm = document.getElementById("ajukanBimbinganForm");

  function openAjukanBimbinganModal() {
    ajukanBimbinganModal.classList.add("show-modal");
    overlay.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeAjukanBimbinganModal() {
    ajukanBimbinganModal.classList.remove("show-modal");
    overlay.classList.remove("visible");
    document.body.style.overflow = "";
  }

  if (ajukanBimbinganBtn) {
    ajukanBimbinganBtn.addEventListener("click", openAjukanBimbinganModal);
  }

  if (closeAjukanModalButton) {
    closeAjukanModalButton.addEventListener("click", closeAjukanBimbinganModal);
  }

  if (cancelModalButton) {
    cancelModalButton.addEventListener("click", closeAjukanBimbinganModal);
  }

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (
        event.target === overlay &&
        ajukanBimbinganModal.classList.contains("show-modal")
      ) {
        closeAjukanBimbinganModal();
      }
    });
  }

  if (submitAjuanForm) {
    submitAjuanForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const tanggal = document.getElementById("tanggalBimbingan").value;
      const waktu = document.getElementById("waktuBimbingan").value;
      const topik = document.getElementById("topikBimbingan").value;
      const catatan = document.getElementById("catatanTambahan").value;
      console.log("Mengajukan Bimbingan:");
      console.log("Tanggal:", tanggal);
      console.log("Waktu:", waktu);
      console.log("Topik:", topik);
      console.log("Catatan:", catatan);
      alert("Ajuan Bimbingan berhasil dikirim!");
      closeAjukanBimbinganModal();
      submitAjuanForm.reset();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      ajukanBimbinganModal.classList.contains("show-modal")
    ) {
      closeAjukanBimbinganModal();
    }
  });

//Laporan Akhir Magang (File Upload)
  const laporanFile = document.getElementById("laporanFile");
  const fileUploadBox = document.querySelector(".file-upload-box");
  const uploadedFileInfo = document.querySelector(".uploaded-file-info");
  const uploadedFileName = uploadedFileInfo.querySelector(".file-name");
  const deleteFileIcon = uploadedFileInfo.querySelector(".delete-file-icon");
  const uploadButton = document.querySelector(".upload-button");

  function handleFileSelect(file) {
    if (file) {
      uploadedFileName.textContent = file.name;
      uploadedFileInfo.style.display = "flex";
      fileUploadBox.style.display = "none";
      uploadButton.style.display = "block";
    } else {
      uploadedFileInfo.style.display = "none";
      uploadedFileName.textContent = "";
      fileUploadBox.style.display = "flex";
      uploadButton.style.display = "none";
    }
  }

  if (laporanFile) {
    laporanFile.addEventListener("change", (event) => {
      handleFileSelect(event.target.files[0]);
    });
  }

  if (deleteFileIcon) {
    deleteFileIcon.addEventListener("click", () => {
      laporanFile.value = null;
      handleFileSelect(null);
    });
  }

  if (uploadButton) {
    uploadButton.addEventListener("click", () => {
      if (laporanFile.files.length > 0) {
        const fileToUpload = laporanFile.files[0];
        console.log(
          "Mengunggah file:",
          fileToUpload.name,
          "Ukuran:",
          fileToUpload.size,
          "tipe:",
          fileToUpload.type
        );
        const formData = new FormData();
        formData.append("laporanAkhir", fileToUpload);
        fetch("/api/upload-laporan-akhir", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Upload Berhasil:", data);
            alert("Laporan akhir berhasil diunggah!");
            laporanFile.value = null;
            handleFileSelect(null);
          })
          .catch((error) => {
            console.error("Error saat mengunggah:", error);
            alert("Terjadi kesalahan saat mengunggah laporan.");
          });

        alert(
          `File "${fileToUpload.name}" berhasil diunggah! (Ini hanya simulasi)`
        );
        laporanFile.value = null;
        handleFileSelect(null);
      } else {
        alert("Pilih file PDF terlebih dahulu.");
      }
    });
  }

  if (submitFileButton) {
    submitFileButton.addEventListener("click", () => {
      if (laporanFile.files.length > 0) {
        const fileToSubmit = laporanFile.files[0];
        console.log("Mengirim file final:", fileToSubmit.name);
        const formData = new FormData();
        formData.append("laporanAkhirFinal", fileToSubmit);
        fetch("/api/kirim-laporan-akhir", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Kirim Laporan Berhasil:", data);
            alert("Laporan akhir berhasil dikirim!");
            laporanFile.value = null;
            handleFileSelect(null);
          })
          .catch((error) => {
            console.error("Error saat mengirim laporan:", error);
            alert("Terjadi kesalahan saat mengirim laporan.");
          });

        alert(
          `Laporan akhir "${fileToSubmit.name}" berhasil dikirim! (Ini hanya simulasi pengiriman final)`
        );
        laporanFile.value = null;
        handleFileSelect(null);
      } else {
        alert("Pilih file PDF terlebih dahulu untuk dikirim.");
      }
    });
  }

  if (fileUploadBox) {
    fileUploadBox.addEventListener("dragover", (event) => {
      event.preventDefault();
      fileUploadBox.style.borderColor = "var(--primary-green)";
      fileUploadBox.style.backgroundColor = "#e6f5f4";
    });

    fileUploadBox.addEventListener("dragleave", () => {
      fileUploadBox.style.borderColor = "var(--border-color)";
      fileUploadBox.style.backgroundColor = "#fff";
    });

    fileUploadBox.addEventListener("drop", (event) => {
      event.preventDefault();
      fileUploadBox.style.borderColor = "var(--border-color)";
      fileUploadBox.style.backgroundColor = "#fff";

      const files = event.dataTransfer.files;
      if (files.length > 0 && files[0].type === "application/pdf") {
        laporanFile.files = files;
        handleFileSelect(files[0]);
      } else {
        alert("Hanya file PDF yang diizinkan!");
      }
    });
  }

  const navItemsWithSubmenu = document.querySelectorAll(
    ".main-nav .nav-item.has-submenu"
  );
  navItemsWithSubmenu.forEach((item) => {
    const anchor = item.querySelector("a");
    const submenu = item.querySelector(".submenu");
    const expandIcon = item.querySelector(".expand-icon");

    if (anchor && submenu && expandIcon) {
      anchor.addEventListener("click", (event) => {
        if (item.classList.contains("has-submenu")) {
          event.preventDefault();
        }

        item.classList.toggle("active");
        if (submenu.classList.contains("active-submenu")) {
          submenu.classList.remove("active-submenu");
          submenu.style.maxHeight = "0";
          expandIcon.textContent = "expand_more";
        } else {
          navItemsWithSubmenu.forEach((otherItem) => {
            if (otherItem !== item && otherItem.classList.contains("active")) {
              otherItem.classList.remove("active");
              const otherSubmenu = otherItem.querySelector(".submenu");
              const otherExpandIcon = otherItem.querySelector(".expand-icon");
              if (otherSubmenu) {
                otherSubmenu.classList.remove("active-submenu");
                otherSubmenu.style.maxHeight = "0";
              }
              if (otherExpandIcon) {
                otherExpandIcon.textContent = "expand_more";
              }
            }
          });

          submenu.classList.add("active-submenu");
          submenu.style.maxHeight = submenu.scrollHeight + "px";
          expandIcon.textContent = "expand_less";
        }
      });
    }
  });

  const activeSubmenuItem = document.querySelector(".submenu-item.active");
  if (activeSubmenuItem) {
    const parentNavItem = activeSubmenuItem.closest(".nav-item.has-submenu");
    if (parentNavItem) {
      parentNavItem.classList.add("active");
      const submenu = parentNavItem.querySelector(".submenu");
      const expandIcon = parentNavItem.querySelector(".expand-icon");
      if (submenu) {
        submenu.classList.add("active-submenu");
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      }
      if (expandIcon) {
        expandIcon.textContent = "expand_less";
      }
    }
  }

  //Penilaian Mahasiswa
  const kirimPenilaianBtn = document.querySelector(".kirim-penilaian-btn");
  const penilaianTextarea = document.querySelector(
    ".form-penilaian-section textarea"
  );
  const nilaiInputs = document.querySelectorAll(
    '.form-penilaian-section input[type="number"]'
  );

  if (kirimPenilaianBtn) {
    kirimPenilaianBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const penilaianData = {
        namaMahasiswa: document.querySelector(
          ".student-info p:nth-child(1) span"
        ).textContent,
        periodeMagang: document.querySelector(
          ".student-info p:nth-child(2) span"
        ).textContent,
        kriteria: {},
        saran: penilaianTextarea ? penilaianTextarea.value.trim() : "",
      };

      let allInputsValid = true;
      nilaiInputs.forEach((input) => {
        const aspek = input
          .closest("tr")
          .querySelector("td:first-child")
          .textContent.trim();
        const nilai = parseInt(input.value);

        if (isNaN(nilai) || nilai < 1 || nilai > 100) {
          alert(`Nilai untuk ${aspek} harus antara 1 dan 100.`);
          input.focus();
          allInputsValid = false;
          return;
        }
        penilaianData.kriteria[aspek] = nilai;
      });

      if (!allInputsValid) {
        return;
      }

      console.log("Data Penilaian:", penilaianData);
      fetch("/api/submit-penilaian", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(penilaianData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Penilaian Berhasil Dikirim:", data);
          alert("Penilaian berhasil dikirim!");
          nilaiInputs.forEach((input) => (input.value = ""));
          if (penilaianTextarea) {
            penilaianTextarea.value = "";
          }
        })
        .catch((error) => {
          console.error("Error saat mengirim penilaian:", error);
          alert("Terjadi kesalahan saat mengirim penilaian.");
        });

      alert("Penilaian berhasil dikirim! (Data ditampilkan di console)");
      nilaiInputs.forEach((input) => (input.value = ""));
      if (penilaianTextarea) {
        penilaianTextarea.value = "";
      }
    });
  }

  //Cetak Sertifikat
  const downloadPdfBtn = document.querySelector(".download-pdf-btn");
  const cetakSertifikatBtn = document.querySelector(".cetak-sertifikat-btn");

  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener("click", () => {
      window.open("/api/download-sertifikat?id=YOUR_SERTIFIKAT_ID", "_blank");
      const pdfUrl = "path/to/your/sertifikat.pdf";
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = "Sertifikat_Magang.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      alert("Fitur Download PDF Sertifikat sedang dikembangkan!");
      console.log("Download PDF Sertifikat diklik.");
    });
  }

  if (cetakSertifikatBtn) {
    cetakSertifikatBtn.addEventListener("click", () => {
      const iframe = document.getElementById("sertifikatIframe");
      if (iframe) {
        iframe.contentWindow.print();
      } else {
        window.print();
      }
      alert("Fitur Cetak Sertifikat fisik sedang dikembangkan!");
      console.log("Cetak Sertifikat fisik diklik.");
    });
  }
});