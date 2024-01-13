import Constants from "expo-constants";
import developmentConfig from "../../Environment/development-config";
import stagingConfig from "../../Environment/staging-config";
import productionConfig from "../../Environment/production-config";

const releaseChannel = Constants?.expoConfig?.version;

const env =
  Constants.appOwnership === "standalone"
    ? releaseChannel || "default"
    : "development";

let config: any;

switch (env) {
  case "development":
    config = developmentConfig;
    break;
  case "staging":
    config = stagingConfig;
    break;
  case "production":
    config = productionConfig;
    break;
  default:
    throw new Error(`Unsupported environment: ${env}`);
}

export const fetchDataApi = async (page: any) => {
  try {
    const response = await fetch(`${config.apiUrl}/data?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};
