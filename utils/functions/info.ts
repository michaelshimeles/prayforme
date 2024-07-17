import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export const getInfo = () => {
  const headersList = headers();

  // Get IP address
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0] : "Unknown";

  // Get user agent information
  const userAgent = headersList.get("user-agent") || "Unknown";
  const parser = new UAParser(userAgent);
  const deviceInfo = parser.getResult();

  // Get approximate location based on IP
  const location = headersList.get("x-vercel-ip-country") || "Unknown";

  return {
    ipAddress: ip,
    device: JSON.stringify(deviceInfo),
    location: location,
  };
};
