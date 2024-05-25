import moment from "moment";
// get Todays date
export const getDate = () => {
  let dateobj = new Date();
  function pad(n: any) {
    return n < 10 ? "0" + n : n;
  }

  let result =
    dateobj.getFullYear() +
    "/" +
    pad(dateobj.getMonth() + 1) +
    "/" +
    pad(dateobj.getDate());
  return result;
};

export const trackDate = (date) => {
  var dateobj = new Date(date);
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  var result =
    pad(dateobj.getDate()) +
    "-" +
    pad(dateobj.getMonth() + 1) +
    "-" +
    dateobj.getFullYear();
  return result;
};

export const trackDates = (date) => {
  var dateobj = new Date(date);
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  var result =
    dateobj.getFullYear() +
    "-" +
    pad(dateobj.getMonth() + 1) +
    "-" +
    pad(dateobj.getDate());

  return result;
};

export const todaysDate = () => {
  var currentdate = new Date();
  var datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
};

// ------------------------------------------------
// Money/Amount auto format method

// add comma
export const addComma = (num: any) => {
  if (typeof num === "string") {
    return num?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

// remove non Numeric
export const removeNum = (num: any) => {
  if (typeof num === "string") {
    return num?.replace(/[^0-9]/g, "");
  } else {
    return num?.toString().replace(/[^0-9]/g, "");
  }
};

// Format money
export const formatMoney = (data: number | string) => {
  return addComma(removeNum(data));
};

// A method to decode jwt
export const parseJwt = (token: string) => {
  if (!token) return;
  const baseUrl = token.split(".")[1];
  const base64 = baseUrl.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export const formatDollars = (amount) => {
  // Convert the amount to a string
  let amountStr = amount.toString();

  // Split the amount into integer and fractional parts if it's a floating-point number
  let parts = amountStr.split(".");
  let integerPart = parts[0];
  let fractionalPart = parts.length > 1 ? "." + parts[1] : "";

  // Add commas to the integer part
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Limit the number of decimal places to 2
  let formattedFractional = fractionalPart.length > 2 ? fractionalPart.slice(0, 3) : fractionalPart;

  // Combine the integer and fractional parts with commas
  let formattedAmount = formattedInteger + formattedFractional;

  return formattedAmount;
}

//
export const removeKobo = (number: any) => {
  const res = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "NGN",
  })
    .format(number)
    .replace(/(\.|,)00$/g, "");
  return res;
};

// calculate time remaining
export const calculateTimeRemaining = (pickupDate, deliveryDate) => {
  const currentTime: any = new Date(pickupDate);
  const targetTime: any = new Date(deliveryDate);

  // Calculate the time difference in milliseconds
  const timeDifference = targetTime - currentTime;

  // Calculate the time difference in minutes and hours
  const hrs = Math.floor(timeDifference / (1000 * 60 * 60));
  const mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { mins: mins, hrs: hrs };
};

export const splitDate = (date) => {
  // Parse the input date string
  const parts = date.split(/[- :]/);
  const year = parseInt(parts[2]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[0]);
  const hour = parseInt(parts[3]);
  const minute = parseInt(parts[4]);

  const parsedDate = new Date(year, month, day, hour, minute);

  // Format the parsed date as "yyyy-MM-dd HH:mm"
  const formattedDate = `${parsedDate.getFullYear()}-${(
    parsedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${parsedDate
      .getDate()
      .toString()
      .padStart(2, "0")} ${parsedDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${parsedDate.getMinutes().toString().padStart(2, "0")}`;

  return formattedDate;
};


export const removeComma = (data) => {
  const monetaryValueWithoutCommas = data?.replace(/,/g, "");
  const result = Number(monetaryValueWithoutCommas);
  return result;
};

export function sortCart(cartItems) {
  // Create a map to keep track of items by their id
  const itemMap = new Map();

  // Iterate over each item in the cart
  cartItems.forEach(item => {
    const { id } = item;

    // Check if the item already exists in the map
    if (itemMap.has(id)) {
      // If exists, increment the quantity
      itemMap.get(id).quantity += 1;
    } else {
      // If not exists, set the quantity to 1 and add to the map
      itemMap.set(id, { ...item, quantity: 1 });
    }
  });

  // Convert the map values to an array and return
  return Array.from(itemMap.values());
}

export const calculateTotal = (data) => {
  const subtotal = data.reduce((prev, item) => {
    return prev + Number(item.price) * item.quantity;
  }, 0);
  return subtotal;
}