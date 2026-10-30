
const radioConfig = {
  stationName: "LC Universal Radio",
  mode: "automatic-and-live",
  publicAccess: true,
  streamUrl: "",
  status: "Sin servidor de transmisión"
};

const station = {
  getConfig() {
    return radioConfig;
  },

  setStream(url) {
    if (!url) return false;

    try {
      const parsed = new URL(url);

      if (parsed.protocol !== "https:" &&
          parsed.protocol !== "http:") {
        return false;
      }

      radioConfig.streamUrl = parsed.href;
      return true;
    } catch {
      return false;
    }
  },

  getStatus() {
    return radioConfig.status;
  }
};

window.LCRadio = station;
