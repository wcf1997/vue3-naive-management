
let BASE_URL = "";
const TIME_OUT = 60000;
const ContentType = "application/json;application/x-www-form-urlencoded";


if (import.meta.env.MODE === "development") {
  BASE_URL = import.meta.env.VITE_BASE_URL as string;
} else if (import.meta.env.MODE === "production") {
  BASE_URL =import.meta.env.VITE_BASE_URL ;
} else {
  BASE_URL =import.meta.env.VITE_BASE_URL ;
}

export { BASE_URL, TIME_OUT, ContentType };
