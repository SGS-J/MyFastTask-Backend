import cors from "cors";
import config from "config";

export default () => {
  return cors(config.get(`serverConfig.cors.domain`));
};
