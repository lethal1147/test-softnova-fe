import dayjs from "dayjs";

export const formatDate = (date: string | Date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatPrice = (num: number | string) => {
  const parsedNum =
    typeof num === "string" ? parseFloat(num.replace(/,/g, "")) : num;

  const formatter = new Intl.NumberFormat("en-Us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(parsedNum);
};
