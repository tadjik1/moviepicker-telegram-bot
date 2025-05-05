import "dotenv/config";
import { Bot, InputMediaBuilder } from "grammy";
import { getRandom } from "./services/kinopoisk";

const bot = new Bot(process.env.TELEGRAM_TOKEN || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", async (ctx) => {
  const entity = await getRandom();

  const media = InputMediaBuilder.photo(entity.poster.url, {
    caption: `${entity.name} \n${entity.shortDescription}`,
    // etc
  });

  ctx.replyWithMediaGroup([media]);
});

bot.start();
