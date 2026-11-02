export const FIRST_WORK_ITEM_PATH = "/docs/empezar/primer-work-item";

/**
 * Comandos del tutorial, definidos una vez. Los literales de ejemplo
 * («mi-feature», «Mi primera feature») son parte del comando y no se traducen.
 */
const EXAMPLE_ID = "2026-10-27_01-54__mi-feature";

export const COMMAND_INIT = "rei init";
export const COMMAND_NEW = `rei new ${EXAMPLE_ID} feature "Mi primera feature"`;
export const COMMAND_STATUS_READY = `rei status set ${EXAMPLE_ID} ready`;
export const COMMAND_STATUS_IN_PROGRESS = `rei status set ${EXAMPLE_ID} in_progress`;
export const COMMAND_CHECK = "rei check";
export const COMMAND_REVIEW = [
  `rei status set ${EXAMPLE_ID} review`,
  `rei review-diff ${EXAMPLE_ID}`,
  `rei validate ${EXAMPLE_ID}`,
].join("\n");
