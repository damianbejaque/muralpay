import { Payout } from "../types/transfer";

const url = import.meta.env.VITE_BASE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY;
const TRANSFER_API_KEY = import.meta.env.VITE_TRANSFER_API_KEY;

export const handleTransfer = async (
  id: string,
  requestDirection: string
): Promise<Payout> => {
  try {
    const response = await fetch(
      `${url}/transfer-requests/${requestDirection}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "mural-account-api-key": TRANSFER_API_KEY,
        },
        body: JSON.stringify({ transferRequestId: id }),
      }
    );

    const responseData = response.headers
      .get("Content-Type")
      ?.includes("application/json")
      ? await response.json()
      : null;

    if (!response.ok) {
      throw new Error(
        responseData?.message ||
          `Server error: ${response.status} ${response.statusText}`
      );
    }

    return responseData;
  } catch (error: unknown) {
    console.error("Error in handleTransfer:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};
