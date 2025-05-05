const {
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
} = require("@medusajs/medusa/core-flows");

/**
 * Seeds basic data for a Medusa store
 */
async function seedDemoData({ container }) {
  const logger = container.resolve("logger");
  
  logger.info("Seeding basic store data...");
  
  try {
    // Create default sales channel if it doesn't exist
    const salesChannelService = container.resolve("salesChannelService");
    let defaultSalesChannel = await salesChannelService.list({
      name: "Default Sales Channel",
    });

    if (!defaultSalesChannel.length) {
      logger.info("Creating default sales channel...");
      const { result: salesChannelResult } = await createSalesChannelsWorkflow(
        container
      ).run({
        input: {
          salesChannelsData: [
            {
              name: "Default Sales Channel",
            },
          ],
        },
      });
      defaultSalesChannel = salesChannelResult;
      logger.info("Default sales channel created");
    }

    // Create a region with USD currency
    logger.info("Creating default region...");
    await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Global",
            currency_code: "usd",
            tax_rate: 0,
            payment_providers: ["manual"],
            countries: ["us"],
          },
        ],
      },
    });
    logger.info("Default region created");

    logger.info("Seed completed successfully");
  } catch (error) {
    logger.error("Error during seed:", error);
  }
}

module.exports = seedDemoData; 