const SUPABASE_URL = "https://nbvgxcpwrnrtqwblmloi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_kBWdiD4EN1InYe7SQssu1Q_LJpVIWtW";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
