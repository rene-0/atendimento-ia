import axios from "axios"

const WHATSAPP_API_URL = "https://graph.facebook.com/"

export class WhatsAppClient {
  private phoneNumberId: string
  private accessToken: string

  constructor() {
    this.phoneNumberId = process.env.PHONE_NUMBER_ID!
    this.accessToken = process.env.META_ACCESS_TOKEN!
  }

  async sendTextMessage(to: string, message: string) {
    const url = `${WHATSAPP_API_URL}/${this.phoneNumberId}/messages`

    try {
      const response = await axios.post(
        url,
        {
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: message },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )

      return response.data
    } catch (error: any) {
      console.error("❌ Erro ao enviar mensagem:", error.response?.data || error.message)
    }
  }
}
