import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://doadxveldfyvhboixznn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvYWR4dmVsZGZ5dmhib2l4em5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4ODM1OTQsImV4cCI6MjA0NDQ1OTU5NH0.AYk1YPMf9AnzWMnn_-yA8qmVyA2iaTCpzMnh2MaCyOg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
