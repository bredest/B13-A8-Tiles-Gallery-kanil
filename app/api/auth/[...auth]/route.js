import { auth } from "@/lib/auth";

export const GET = async (req) => {
  try {
    return await auth.handler(req);
  } catch (e) {
    console.error("AUTH ERROR GET:", e);
    throw e;
  }
};

export const POST = async (req) => {
  try {
    return await auth.handler(req);
  } catch (e) {
    console.error("AUTH ERROR POST:", e);
    throw e;
  }
};
