/*
 * FILE DATABASE
 *
 * Mengelola metadata file pada tabel public.files.
 */


/*
 * Simpan metadata file
 */

async function createFileRecord({
    userId,
    fileName,
    storagePath,
    fileSize,
    mimeType
}) {

    const {
        data,
        error
    } = await supabaseClient
        .from("files")
        .insert({
            user_id: userId,
            file_name: fileName,
            storage_path: storagePath,
            file_size: fileSize,
            mime_type: mimeType
        })
        .select()
        .single();


    if (error) {

        throw error;

    }


    return data;
}


/*
 * Ambil file milik user
 */

async function getUserFiles(userId) {

    const {
        data,
        error
    } = await supabaseClient
        .from("files")
        .select("*")
        .eq("user_id", userId)
        .order(
            "created_at",
            {
                ascending: false
            }
        );


    if (error) {

        throw error;

    }


    return data || [];
}


/*
 * Hapus metadata file
 */

async function deleteFileRecord(
    fileId,
    userId
) {

    const {
        error
    } = await supabaseClient
        .from("files")
        .delete()
        .eq("id", fileId)
        .eq("user_id", userId);


    if (error) {

        throw error;

    }

}