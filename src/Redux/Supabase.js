import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://auxwhdusfpgyzbwgjize.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1eHdoZHVzZnBneXpid2dqaXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NjM0ODcsImV4cCI6MjA2NzIzOTQ4N30.XQ9uqohMGWcSahakaGuNxCcQ7-abvZ4zLFmeZaf112E'
export const supabase = createClient(supabaseUrl, supabaseKey);