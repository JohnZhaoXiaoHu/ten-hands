const Logger = require("just-enough-logger").default;
import { CONFIG_FILES } from "../shared/config";

export const log = new Logger({
  transports: ["file", "console"],
  file: CONFIG_FILES.logFile
});
