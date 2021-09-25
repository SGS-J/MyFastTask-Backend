import cors from "cors";
import config from "config";


export default () => {
  return cors({origin: config.get("serverConfig.cors.domain")});
};
