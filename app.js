
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
// CONEXIÓN SUPABASE - LC UNIVERSAL RADIO
const SUPABASE_URL = "https://tfwepffzhuyppsavmoqw.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_n0vNAh0oHBm99rjpF-Y-jQ_4ZNGaLQ4";

const supabaseRadio = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
console.log("LC Universal Radio: Supabase conectado");
supabaseRadio.storage
  .from("lc-radio-music")
  .list()
  .then(({ data, error }) => {
    if (error) {
      console.error("Error de Supabase:", error.message);
    } else {
      console.log("LC Radio: lectura correcta", data);
    }
  });
