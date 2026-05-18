CREATE TABLE IF NOT EXISTS appointment_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    preferred_date INTEGER NOT NULL,
    preferred_time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security
ALTER TABLE appointment_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new requests
CREATE POLICY "Anyone can insert appointment requests" ON appointment_requests
    FOR INSERT WITH CHECK (true);

-- Allow admins to read, update, and delete requests
CREATE POLICY "Admins can view and manage appointment requests" ON appointment_requests
    FOR ALL USING (has_role('admin'));
