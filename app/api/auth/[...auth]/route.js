import { auth } from "@/lib/auth";

export const GET = async (req) => {
  const url = new URL(req.url);
  console.log(`[AUTH] GET ${url.pathname}${url.search}`);
  try {
    const res = await auth.handler(req);
    return res;
  } catch (e) {
    console.error("[AUTH ERROR] GET:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

export const POST = async (req) => {
  const url = new URL(req.url);
  console.log(`[AUTH] POST ${url.pathname}${url.search}`);
  try {
    const res = await auth.handler(req);
    return res;
  } catch (e) {
    console.error("[AUTH ERROR] POST:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
