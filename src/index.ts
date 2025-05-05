import "dotenv/config";
import {
  Bot,
  GrammyError,
  HttpError,
  InlineKeyboard,
  InputMediaBuilder,
  Keyboard,
} from "grammy";
import { getRandom, search } from "./services/kinopoisk";
import { getRecommendations } from "./services/openai";

const bot = new Bot(process.env.TELEGRAM_TOKEN || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", async (ctx) => {
  if (!ctx.message.text) {
    ctx.reply("Пожалуйста, пришли текстовый запрос");
    return;
  }

  ctx.replyWithChatAction("typing");

  const recommendations = await getRecommendations(ctx.message.text);

  if (!recommendations?.entities.length) {
    ctx.reply(recommendations?.response ?? "");
    return;
  }

  const entities = await Promise.all(
    recommendations.entities.slice(0, 4).map((entity) => search(entity.title)),
  );

  for (const entity of entities) {
    if (!entity?.poster?.url) continue;

    const button = new InlineKeyboard().url(
      "Посмотреть",
      `https://hd.kinopoisk.ru/film/${entity.externalId.kpHD}`,
    );

    await ctx.replyWithPhoto(entity?.poster?.url, {
      caption: `${entity.name} \n${entity.shortDescription}`,
      reply_markup: button,
    });
  }
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }

  ctx.reply(
    "К сожалению, нам не удалось обработать ваш запрос, попробуйте еще раз.",
  );
});

bot.start();
