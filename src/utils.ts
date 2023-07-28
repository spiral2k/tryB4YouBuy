import { getUnixTime, addMinutes } from "date-fns";
import { Context, Markup, Telegraf } from "telegraf";
import channels from "./channels";

export const getExpiryDateForInvitation = () => {
  return getUnixTime(addMinutes(new Date(), 10));
};

export const getChannels = () => {
  return Object.keys(channels).map((channel) => {
    const channelf = (channels as any)[channel];

    return Markup.button.callback(channelf.name, channelf.alias);
  });
};
