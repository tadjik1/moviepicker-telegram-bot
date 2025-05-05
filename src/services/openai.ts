import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAI();

const Recommendations = z.object({
  entities: z.array(
    z.object({
      title: z.string(),
      reasoning: z.string(),
    }),
  ),
  response: z.string(),
});

export async function getRecommendations(query: string) {
  const completion = await client.beta.chat.completions.parse({
    model: "gpt-4.1",
    messages: [
      {
        role: "developer",
        content: `
          Ты кинокритик, который советует пользователям фильмы и сериалы, исходя из их 
          запросов и пожеланий. Возвращай массив рекомендаций фильмов и сериалов, указывая
          причину, по которой ты думаешь, что это релевантно. Возвращай не больше 5 рекомендаций.
          Если запрос пользователя не относится к фильмам и сериалам и твоей экспертизе - дай
          пользователю об этом знать.`,
      },
      {
        role: "user",
        content: query,
      },
    ],
    response_format: zodResponseFormat(Recommendations, "response"),
  });

  const recommendations = completion.choices[0].message.parsed;

  console.log("openai response:", recommendations);

  return recommendations;
}
