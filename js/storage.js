/*
 * STORAGE
 *
 * Mengelola file di Supabase Storage.
 */


const STORAGE_BUCKET = "files";


/*
 * Batas upload
 */

const MAX_FILE_SIZE =
    10 * 1024 * 1024;


/*
 * Tipe file yang diperbolehkan
 */

const ALLOWED_MIME_TYPES = [

    "application/pdf",

    "image/jpeg",
    "image/png",
    "image/webp",

    "text/plain",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/vnd.ms-excel",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    "application/vnd.ms-powerpoint",

    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    "application/zip"

];


/*
 * Validasi file
 */

function validateFile(file) {

    if (!file) {

        throw new Error(
            "Tidak ada file yang dipilih."
        );

    }


    if (file.size <= 0) {

        throw new Error(
            "File kosong tidak diperbolehkan."
        );

    }


    if (file.size > MAX_FILE_SIZE) {

        throw new Error(
            "Ukuran file maksimal adalah 10 MB."
        );

    }


    if (
        !ALLOWED_MIME_TYPES.includes(
            file.type
        )
    ) {

        throw new Error(
            "Jenis file tersebut belum didukung."
        );

    }


    return true;
}


/*
 * Membuat nama file yang aman
 */

function createSafeFileName(file) {

    const extension =
        file.name.includes(".")
            ? "." + file.name.split(".").pop()
            : "";


    const randomId =
        crypto.randomUUID();


    return randomId + extension;
}


/*
 * Upload file
 */

async function uploadFile(
    file,
    userId
) {

    validateFile(file);


    const safeFileName =
        createSafeFileName(file);


    const filePath =
        `${userId}/${safeFileName}`;


    const {
        data,
        error
    } = await supabaseClient.storage
        .from(STORAGE_BUCKET)
        .upload(
            filePath,
            file,
            {
                cacheControl: "3600",
                upsert: false,
                contentType: file.type
            }
        );


    if (error) {

        throw error;

    }


    return {
        path: data.path,
        safeFileName: safeFileName
    };
}


/*
 * Signed URL
 */

async function createDownloadUrl(
    filePath
) {

    const {
        data,
        error
    } = await supabaseClient.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(
            filePath,
            60
        );


    if (error) {

        throw error;

    }


    return data.signedUrl;
}


/*
 * Hapus file
 */

async function deleteStorageFile(
    filePath
) {

    const {
        error
    } = await supabaseClient.storage
        .from(STORAGE_BUCKET)
        .remove([
            filePath
        ]);


    if (error) {

        throw error;

    }

}