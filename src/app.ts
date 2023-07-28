import { Context, Markup, Telegraf } from "telegraf";
import { Update } from "typegram";
import channels from "./channels";
import { createInviteLink } from "./api";
import logger from "./logger";

require("dotenv").config();

const bot: Telegraf<Context<Update>> = new Telegraf(
  process.env.BOT_TOKEN as string
);

const getOptions = () => {
  return Object.keys(channels).map((channel) => {
    const channelf = (channels as any)[channel];

    return Markup.button.callback(channelf.name, channelf.alias);
  });
};

bot.use(async (ctx, next) => {
  const update = ctx.update as any;
  const user = update.callback_query?.from || update.message?.from;

  if (user) {
    logger.info(JSON.stringify(user));
  } else {
    logger.info("NO USER FOUND: " + JSON.stringify(ctx));
  }
  await next();
});

bot.start((ctx) => {
  ctx.reply("ברוך הבא לבוט הכי נדיר בטלגרם " + ctx.from.first_name + "!");

  ctx.reply("אהלן וסהלן", Markup.inlineKeyboard(getOptions()));
});

bot.action("samples", (ctx) => {
  ctx.telegram.getChat("@tryb4youbuy_samples").then(async () => {
    const invite = await createInviteLink("@tryb4youbuy_samples", ctx);

    ctx.reply(invite.invite_link);
  });
});

bot.action("vst", (ctx) => {
  ctx.telegram.getChat("@tryb4youbuy_vst").then(async () => {
    const invite = await createInviteLink("@tryb4youbuy_vst", ctx);

    ctx.reply(invite.invite_link);
  });
});

bot.action("production", (ctx) => {
  ctx.telegram.getChat("@tryb4youbuy_production").then(async () => {
    const invite = await createInviteLink("@tryb4youbuy_production", ctx);

    ctx.reply(invite.invite_link);
  });
});

bot.help((ctx) => {
  ctx.reply("Send /start to get the groups link by category");
  ctx.reply("Send /quit to stop the bot");
});

bot.command("quit", (ctx) => {
  ctx.leaveChat();
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
