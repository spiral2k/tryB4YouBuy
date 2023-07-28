import { getExpiryDateForInvitation } from "./utils";
import { Context, Markup, Composer, Telegraf } from "telegraf";

export const createInviteLink = async (groupName: string, ctx: Context) => {
  return ctx.telegram.createChatInviteLink(groupName, {
    name: ctx.from?.first_name,
    expire_date: getExpiryDateForInvitation(),
    member_limit: 1,
  });
};
