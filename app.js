
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

      if (
        parsed.protocol !== "https:" &&
        parsed.protocol !== "http:"
      ) {
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
const SUPABASE_URL = "https://tfwepffzhuyppsavmoqw.supabase.co";
const SUPABASE_KEY = "sb_publishable_n0vNAh0oHBm99rjpF-Y-jQ_4ZNGaLQ4";
const supabaseRadio = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("LC Universal Radio: Supabase conectado");

const statusRadio = document.getElementById("supabase-status");

supabaseRadio.storage
  .from("lc-radio-music")
  .list()
  .then(({ data, error }) => {
    if (error) {
      statusRadio.textContent =
        "Error de conexión: " + error.message;
    } else {
      statusRadio.textContent =
        "Supabase conectado. Archivos encontrados: " + data.length;
    }
  })
  .catch((error) => {
    statusRadio.textContent =
      "Error: " + error.message;
  });
