import dayjs from 'dayjs';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const numberFormat = (num: number, digit: number = 2) => {

  if (typeof num !== "number") {
    num = parseFloat(num)
  }

  if (typeof num === "number") {
    const nStr = num.toFixed(digit);
    const x = nStr.split(".");
    let x1 = x[0];
    const x2 = x.length > 1 ? "." + x[1] : "";
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  }

  return num;
};

export const dateFormat = (_date: any) => dayjs(_date).format("DD/MM/YYYY");
export const dateValue = (_date: any) => dayjs(_date).format("YYYY-MM-DD");
export const dateTimeFormat = (_date: any) =>
  dayjs(_date).format("DD/MM/YYYY HH:mm:ss");
export const dateTimeValue = (_date: any) =>
  dayjs(_date).format("YYYY-MM-DD HH:mm:ss");

export const generateRandomFileName = (extension: string | null = null) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 16);
  const fileName = `${randomString}-${timestamp}`;

  return extension ? `${fileName}${extension}` : fileName;
}
