import express, { Request } from "express"
import { getAIResponse } from "../domain/ia/conversation-service"
import { WhatsAppClient } from "../infra/whatsapp/whatsapp-client"

const app = express()
app.use(express.json())

const verifyToken = process.env.VERIFY_TOKEN

app.get("/", (req, res) => {
  const { "hub.mode": mode, "hub.challenge": challenge, "hub.verify_token": token } = req.query

  if (mode === "subscribe" && token === verifyToken) {
    console.log("WEBHOOK VERIFIED")
    res.status(200).send(challenge)
  } else {
    res.status(403).end()
  }
})

app.post("/", (req: Request<any, any, MessageRequest>, res) => {
  // const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19)
  // console.log(`\n\nWebhook received ${timestamp}\n`)
  req.body.entry.forEach((entry) => {
    entry.changes.forEach((change) => {
      change.value.messages?.forEach(async (message) => {
        console.log(`From: ${message.from}`)
        console.log(`Message: ${message.text.body}\n`)
        const answer = await getAIResponse(message.text.body, message.from)
        const whatsAppClient = new WhatsAppClient()
        await whatsAppClient.sendTextMessage(message.from, answer || "Desculpe, não consegui processar sua mensagem.")
      })
    })
  })
  // console.log(JSON.stringify(req.body, null, 2))
  res.status(200).end()
})

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080")
})

export interface MessageRequest {
  object: string
  entry: Entry[]
}

export interface Entry {
  id: string
  changes: Change[]
}

export interface Change {
  value: Value
  field: string
}

export interface Value {
  messaging_product: string
  metadata: Metadata
  contacts: Contact[]
  messages: Message[]
}

export interface Metadata {
  display_phone_number: string
  phone_number_id: string
}

export interface Contact {
  profile: Profile
  wa_id: string
}

export interface Profile {
  name: string
}

export interface Message {
  from: string
  id: string
  timestamp: string
  text: Text
  type: string
}

export interface Text {
  body: string
}
