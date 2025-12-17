import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const DEFAULT_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getAmbassadorSecret() {
  const secret =
    process.env.AMBASSADOR_API_SECRET?.trim() ??
    process.env.NEXT_PUBLIC_AMBASSADOR_API_SECRET?.trim() ??
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ??
    process.env.SUPABASE_ANON_KEY?.trim();

  if (!secret) {
    throw new Error(
      "Missing AMBASSADOR_API_SECRET (or SUPABASE keys). Set a secret to enable ambassador token signing.",
    );
  }

  return secret;
}

type AmbassadorTokenPayload = {
  code: string;
  exp: number;
  nonce: string;
};

export function createAmbassadorToken(
  code: string,
  ttlMs: number = DEFAULT_TTL_MS,
) {
  const payload: AmbassadorTokenPayload = {
    code,
    exp: Date.now() + ttlMs,
    nonce: randomBytes(6).toString("base64url"),
  };

  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  const signature = createHmac("sha256", getAmbassadorSecret())
    .update(payloadEncoded)
    .digest("base64url");

  return `${payloadEncoded}.${signature}`;
}

export function verifyAmbassadorToken(token: string | null, code: string) {
  if (!token || !code) {
    return { valid: false, reason: "missing_token" as const };
  }

  const [payloadEncoded, signature] = token.split(".");
  if (!payloadEncoded || !signature) {
    return { valid: false, reason: "malformed_token" as const };
  }

  const expectedSignature = createHmac("sha256", getAmbassadorSecret())
    .update(payloadEncoded)
    .digest("base64url");

  if (!secureCompare(signature, expectedSignature)) {
    return { valid: false, reason: "invalid_signature" as const };
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadEncoded, "base64url").toString("utf8"),
    ) as AmbassadorTokenPayload;

    if (payload.code !== code) {
      return { valid: false, reason: "code_mismatch" as const };
    }

    if (Date.now() > payload.exp) {
      return { valid: false, reason: "expired" as const };
    }

    return { valid: true, payload };
  } catch (error) {
    console.error("Failed to parse ambassador token payload", error);
    return { valid: false, reason: "parse_failure" as const };
  }
}

function secureCompare(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  try {
    return timingSafeEqual(aBuffer, bBuffer);
  } catch {
    return false;
  }
}
