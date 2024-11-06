// prettier-ignore
const timezones = [
    "Pacific/Midway", "Pacific/Honolulu", "America/Juneau", "America/Los_Angeles",
    "America/Tijuana", "America/Denver", "America/Phoenix", "America/Chihuahua",
    "America/Mazatlan", "America/Chicago", "America/Regina", "America/Mexico_City",
    "America/Monterrey", "America/Guatemala", "America/New_York", "America/Indiana/Indianapolis",
    "America/Bogota", "America/Lima", "America/Halifax", "America/Caracas",
    "America/La_Paz", "America/Santiago", "America/St_Johns", "America/Sao_Paulo",
    "America/Argentina/Buenos_Aires", "America/Guyana", "America/Godthab", "Atlantic/Azores",
    "Atlantic/Cape_Verde", "Europe/Dublin", "Europe/Lisbon", "Europe/London",
    "Africa/Casablanca", "Africa/Monrovia", "Etc/UTC", "Europe/Belgrade",
    "Europe/Bratislava", "Europe/Budapest", "Europe/Ljubljana", "Europe/Prague",
    "Europe/Sarajevo", "Europe/Skopje", "Europe/Warsaw", "Europe/Zagreb",
    "Europe/Brussels", "Europe/Copenhagen", "Europe/Madrid", "Europe/Paris",
    "Europe/Amsterdam", "Europe/Berlin", "Europe/Rome", "Europe/Stockholm",
    "Europe/Vienna", "Africa/Algiers", "Europe/Bucharest", "Africa/Cairo",
    "Europe/Helsinki", "Europe/Kiev", "Europe/Riga", "Europe/Sofia",
    "Europe/Tallinn", "Europe/Vilnius", "Europe/Athens", "Europe/Istanbul",
    "Europe/Minsk", "Asia/Jerusalem", "Africa/Harare", "Africa/Johannesburg",
    "Europe/Volgograd", "Europe/Moscow", "Asia/Kuwait", "Asia/Riyadh",
    "Africa/Nairobi", "Asia/Baghdad", "Asia/Tehran", "Asia/Muscat",
    "Asia/Baku", "Asia/Tbilisi", "Asia/Yerevan", "Asia/Kabul",
    "Asia/Yekaterinburg", "Asia/Karachi", "Asia/Tashkent", "Asia/Kolkata",
    "Asia/Kathmandu", "Asia/Dhaka", "Asia/Colombo", "Asia/Almaty",
    "Asia/Novosibirsk", "Asia/Rangoon", "Asia/Bangkok", "Asia/Jakarta",
    "Asia/Krasnoyarsk", "Asia/Shanghai", "Asia/Chongqing", "Asia/Hong_Kong",
    "Asia/Urumqi", "Asia/Kuala_Lumpur", "Asia/Singapore", "Asia/Taipei",
    "Australia/Perth", "Asia/Irkutsk", "Asia/Ulaanbaatar", "Asia/Seoul",
    "Asia/Tokyo", "Asia/Yakutsk", "Australia/Darwin", "Australia/Adelaide",
    "Australia/Sydney", "Australia/Brisbane", "Australia/Hobart", "Asia/Vladivostok",
    "Pacific/Guam", "Asia/Magadan", "Pacific/Noumea", "Pacific/Fiji",
    "Asia/Kamchatka", "Pacific/Majuro", "Pacific/Auckland", "Pacific/Tongatapu"
];

export const digiclock = {
  populateTimezoneSelector() {
    const timezoneSelector = document.getElementById("timezone-selector");
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = new Date().toLocaleString("en-US", { timeZone: localTimezone });

    timezones.forEach((timezone) => {
      const option = document.createElement("option");
      const timezoneTime = new Date().toLocaleString("en-US", { timeZone: timezone });
      const diff = (new Date(timezoneTime) - new Date(localTime)) / 3600000;
      const diffString = diff >= 0 ? `+${diff}` : `${diff}`;
      option.value = timezone;
      option.textContent = `${timezone.replace("_", " ")} (UTC${diffString})`;
      timezoneSelector.appendChild(option);
    });
  },

  updateClock() {
    const clockElement = document.getElementById("clock");
    const timezoneSelector = document.getElementById("timezone-selector");
    const timezone = timezoneSelector.value;

    const now = new Date();
    const options = {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const timeString = now.toLocaleTimeString("en-US", options);
    clockElement.textContent = timeString;
  },

  setDefaultTimezone() {
    const timezoneSelector = document.getElementById("timezone-selector");
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneSelector.value = localTimezone;
  },

  init() {
    this.populateTimezoneSelector();
    this.setDefaultTimezone();
    setInterval(this.updateClock, 1000);
    this.updateClock();
    document.getElementById("timezone-selector").addEventListener("change", this.updateClock);
  },
};
