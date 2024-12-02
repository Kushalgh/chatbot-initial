import axios from "axios";

export const callWebhook = async (url: string, data: any): Promise<any> => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Webhook call failed:", error);
    throw error;
  }
};
