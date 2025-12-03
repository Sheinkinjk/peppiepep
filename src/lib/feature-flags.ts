const schedulerFlag = process.env.NEXT_PUBLIC_CAMPAIGN_SCHEDULER_READY;

/**
 * True when the async dispatcher can honor scheduled campaign sends.
 * Default is false so the UI gates the control until the scheduler ships.
 */
export const campaignSchedulerEnabled = schedulerFlag === "true";
