import { createNode, getNodeByName } from "../functions/nodes"

module.exports = async (message: any) => {
  const node = await getNodeByName(message.name)
  if (node == undefined) {
    createNode({
      cpus: message.cpus,
      name: message.name,
      memory: message.memory,
    })
  }
}
