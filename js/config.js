const SUPABASE_URL = "https://nbvgxcpwrnrtqwblmloi.supabase.com";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idmd4Y3B3cm5ydHF3YmxtbG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MTM3MTcsImV4cCI6MjEwNjE4OTcxN30.sgva-FR_3SNwGIM4Mguw9GTMr5dlxBJ0A0KpRWgWMUM";


const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);