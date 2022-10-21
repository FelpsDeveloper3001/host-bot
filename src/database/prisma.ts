import { PrismaClient } from "@prisma/client"
import { color } from "../functions"

const prisma = new PrismaClient()

async function connect() {
  await prisma.$connect()
}

connect()
  .then(async () => {
    console.log(color("text", `💪 Successfully Prisma connection`))
  })
  .catch(async (e) => {
    console.log(color("error", `💪 Error in Prisma connection`)), e
  })

export { connect, prisma }
