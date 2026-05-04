import { auth } from "@/lib/auth";

export const GET = async (req) => {
  console.log("AUTH REQUEST GET:", req.url);
  try {
    const res = await auth.handler(req);
    return res;
  } catch (e) {
    console.error("AUTH ERROR GET:", e);
    throw e;
  }
};

export const POST = async (req) => {
  console.log("AUTH REQUEST POST:", req.url);
  try {
    const res = await auth.handler(req);
    return res;
  } catch (e) {
    console.error("AUTH ERROR POST:", e);
    throw e;
  }
};
