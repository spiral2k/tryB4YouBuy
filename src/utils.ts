import { format, getUnixTime, addMinutes } from "date-fns";

export const getExpiryDateForInvitation = () => {
  return getUnixTime(addMinutes(new Date(), 10));
};
