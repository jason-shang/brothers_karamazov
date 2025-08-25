import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseURL, getSupabaseKey } from "@/lib/utils";

const supabase = createClient(getSupabaseURL(), getSupabaseKey());

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expected) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // keep Supabase project alive
    // combined read + write activity
    const { data, error } = await supabase
      .from("keep_alive")
      .upsert({ 
        id: 1, 
        last_ping: new Date().toISOString() 
      }, { 
        onConflict: 'id' 
      });

    // lightweight query
    await supabase
      .from("documents")
      .select("id")
      .limit(1);

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      pinged: !!data?.length,
    });
  } catch (err: any) {
    console.error("Supabase cron ping failed:", err.message);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
