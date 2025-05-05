import "dotenv/config";
import { Bot, InlineKeyboard, InputMediaBuilder, Keyboard } from "grammy";
import { getRandom, search } from "./services/kinopoisk";
import { getRecommendations } from "./services/openai";

const bot = new Bot(process.env.TELEGRAM_TOKEN || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", async (ctx) => {
  if (!ctx.message.text) {
    ctx.reply("Пожалуйста, пришли текстовый запрос");
    return;
  }

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

  // const medias = entities
  //   .filter((entity) => {
  //     return !!entity?.poster?.url;
  //   })
  //   .map((entity) => {
  //     return InputMediaBuilder.photo(entity.poster.url, {
  //       caption: `${entity.name} \n${entity.shortDescription}`,
  //       // etc
  //     });
  //   });

  // ctx.replyWithMediaGroup(medias);
});

bot.start();
