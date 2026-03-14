import { ExecArgs } from "@medusajs/framework/types"

export default async function seedTemplates({ container }: ExecArgs) {
  const logger = container.resolve("logger")

  try {
    const emailService = container.resolve("emailModuleService") as any
    const result = await emailService.seedDefaultTemplates()
    logger.info(
      `Email templates seeded: ${result.created} created, ${result.skipped} skipped`
    )
  } catch (error) {
    logger.error(`Failed to seed templates: ${error}`)
  }
}
