import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import type { IResult } from "../../types";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { promises as fs } from "fs";
import path from "path";

export const speakRouter = router({
  makeQuery: publicProcedure
    .input(z.object({ query: z.string(), text: z.string() }))
    .mutation(async ({ input }) => {
      const query = input.query;
      const text = input.text;
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_KEY,
      });
      const openai = new OpenAIApi(configuration);
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Can you make this text more ${query}: ${text}`,
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 1,
        });
        if (!completion.data.choices[0]?.text) {
          const results: IResult<undefined> = {
            error: true,
            message: "No response from AI",
            success: false,
            data: undefined,
          };
          return results;
        }
        console.log(completion.data.choices);
        const results: IResult<string> = {
          error: false,
          message: "Success",
          success: true,
          data: completion.data.choices[0]?.text,
        };
        return results;
      } catch (error) {
        const results: IResult<undefined> = {
          error: true,
          message: (error as { message: string }).message,
          success: false,
          data: undefined,
        };
        return results;
      }
    }),
  createWordDocument: publicProcedure
    .input(z.object({ document: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const dir = path.join(process.cwd(), "templates");
      //Read the json data file data.json
      const content = await fs.readFile(dir + "/default.docx", "binary");
      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      doc.setData({ paragraphs: input.document.map((p) => ({ text: p })) });
      doc.render();

      const buf: any = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
      });

      const file = {
        content: Buffer.from(buf, "utf-8").toString("base64"),
        filename: "cateringlabels.docx",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        disposition: "attachment",
      };

      const results: IResult<string> = {
        error: false,
        message: "Success",
        success: true,
        data: file.content,
      };

      return results;
    }),
});
