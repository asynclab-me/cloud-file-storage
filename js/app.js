/*
 * MAIN APPLICATION
 */


/*
 * Elemen UI
 */

const fileInput =
    document.getElementById("fileInput");

const uploadStatus =
    document.getElementById("uploadStatus");

const fileList =
    document.getElementById("fileList");

const refreshBtn =
    document.getElementById("refreshBtn");


let currentUser = null;


/*
 * Format ukuran file
 */

function formatFileSize(bytes) {

    if (bytes === 0) {
        return "0 Bytes";
    }


    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    const size =
        bytes /
        Math.pow(1024, index);


    return (
        size.toFixed(2) +
        " " +
        units[index]
    );

}


/*
 * Format tanggal
 */

function formatDate(dateString) {

    return new Date(
        dateString
    ).toLocaleString(
        "id-ID",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


/*
 * Escape HTML
 *
 * Mencegah nama file dimasukkan
 * langsung sebagai HTML.
 */

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/*
 * Load file
 */

async function loadFiles() {

    if (!currentUser) {
        return;
    }


    fileList.innerHTML =
        `
        <div class="empty-state">
            Memuat file...
        </div>
        `;


    try {

        const files =
            await getUserFiles(
                currentUser.id
            );


        if (files.length === 0) {

            fileList.innerHTML =
                `
                <div class="empty-state">

                    <div class="file-icon">
                        📁
                    </div>

                    <strong>
                        Belum ada file
                    </strong>

                    <p>
                        Upload file pertama kamu
                        menggunakan tombol di atas.
                    </p>

                </div>
                `;

            return;

        }


        fileList.innerHTML = "";


        files.forEach(
            function (file) {

                const item =
                    document.createElement("div");


                item.className =
                    "file-item";


                item.innerHTML =
                    `
                    <div class="file-info">

                        <div class="file-icon">
                            📄
                        </div>

                        <div>

                            <strong>
                                ${escapeHtml(file.file_name)}
                            </strong>

                            <small>
                                ${formatFileSize(file.file_size)}
                                •
                                ${formatDate(file.created_at)}
                            </small>

                        </div>

                    </div>


                    <div class="file-actions">

                        <button
                            class="btn btn-outline"
                            data-action="download"
                            data-path="${escapeHtml(file.storage_path)}"
                        >
                            Download
                        </button>


                        <button
                            class="btn btn-danger"
                            data-action="delete"
                            data-id="${file.id}"
                            data-path="${escapeHtml(file.storage_path)}"
                        >
                            Hapus
                        </button>

                    </div>
                    `;


                fileList.appendChild(item);

            }
        );

    } catch (error) {

        console.error(error);


        fileList.innerHTML =
            `
            <div class="empty-state">
                Gagal memuat file.
            </div>
            `;

    }

}


/*
 * Upload
 */

if (fileInput) {

    fileInput.addEventListener(
        "change",
        async function () {

            const file =
                fileInput.files[0];


            if (!file) {
                return;
            }


            if (!currentUser) {

                alert(
                    "Sesi login tidak ditemukan."
                );

                fileInput.value = "";

                return;

            }


            fileInput.disabled = true;


            uploadStatus.textContent =
                "Memeriksa file...";


            let uploadedPath = null;


            try {

                /*
                 * 1. Validasi dan upload
                 */

                uploadStatus.textContent =
                    "Mengupload file...";


                const uploadResult =
                    await uploadFile(
                        file,
                        currentUser.id
                    );


                uploadedPath =
                    uploadResult.path;


                /*
                 * 2. Simpan metadata
                 */

                uploadStatus.textContent =
                    "Menyimpan informasi file...";


                await createFileRecord({

                    userId:
                        currentUser.id,

                    fileName:
                        file.name,

                    storagePath:
                        uploadResult.path,

                    fileSize:
                        file.size,

                    mimeType:
                        file.type ||
                        "application/octet-stream"

                });


                /*
                 * 3. Berhasil
                 */

                uploadStatus.textContent =
                    "✓ File berhasil diupload.";


                fileInput.value = "";


                await loadFiles();

            } catch (error) {

                console.error(error);


                /*
                 * Jika Storage berhasil tetapi
                 * database gagal, hapus file dari Storage.
                 */

                if (uploadedPath) {

                    try {

                        await deleteStorageFile(
                            uploadedPath
                        );

                    } catch (cleanupError) {

                        console.error(
                            "Cleanup gagal:",
                            cleanupError
                        );

                    }

                }


                uploadStatus.textContent =
                    "Upload gagal: " +
                    error.message;

            }


            fileInput.disabled = false;

        }
    );

}


/*
 * Download / Delete
 */

if (fileList) {

    fileList.addEventListener(
        "click",
        async function (event) {

            const button =
                event.target.closest(
                    "button"
                );


            if (!button) {
                return;
            }


            const action =
                button.dataset.action;


            const path =
                button.dataset.path;


            /*
             * DOWNLOAD
             */

            if (action === "download") {

                try {

                    const url =
                        await createDownloadUrl(
                            path
                        );


                    window.open(
                        url,
                        "_blank"
                    );

                } catch (error) {

                    console.error(error);

                    alert(
                        "Gagal membuat link download."
                    );

                }

            }


            /*
             * DELETE
             */

            if (action === "delete") {

                const fileId =
                    button.dataset.id;


                const confirmed =
                    confirm(
                        "Yakin ingin menghapus file ini?"
                    );


                if (!confirmed) {
                    return;
                }


                button.disabled = true;


                button.textContent =
                    "Menghapus...";


                try {

                    /*
                     * 1. Hapus Storage
                     */

                    await deleteStorageFile(
                        path
                    );


                    /*
                     * 2. Hapus Database
                     */

                    await deleteFileRecord(
                        fileId,
                        currentUser.id
                    );


                    await loadFiles();

                } catch (error) {

                    console.error(error);


                    alert(
                        "Gagal menghapus file: " +
                        error.message
                    );


                    button.disabled = false;


                    button.textContent =
                        "Hapus";

                }

            }

        }
    );

}


/*
 * Refresh
 */

if (refreshBtn) {

    refreshBtn.addEventListener(
        "click",
        loadFiles
    );

}


/*
 * Inisialisasi
 */

async function initializeApp() {

    /*
     * Hanya dashboard yang membutuhkan
     * current user.
     */

    if (!fileList) {
        return;
    }


    currentUser =
        await requireAuth();


    if (!currentUser) {
        return;
    }


    await loadFiles();

}


initializeApp();