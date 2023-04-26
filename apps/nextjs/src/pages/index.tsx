import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { Textarea, Button, Text, Loading, Card } from "@nextui-org/react";
import { Box } from "../components/Box";
import Microphone from "../components/Microphone";
import { useHasHydrated } from "../hooks/hasHydrated";

const Home: NextPage = () => {
  const hasHydrated = useHasHydrated();
  const [document, setDocument] = React.useState<string[]>([]);
  const [chosenParagraph, setChosenParagraph] = React.useState(0);
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState("");

  const summaryQuery = trpc.speak.makeQuery.useMutation();

  const generateQuery = async (query: string) => {
    if (text === "" || !text) {
      setError("Please enter some text.");
      return;
    }

    const summary = await summaryQuery.mutateAsync({
      query: query,
      text: text.trim(),
    });

    if (summary?.error) {
      setError(summary?.message);
    } else if (summary?.data && summary?.success) {
      setText(summary?.data.trim());
      setError("");
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  const saveParagraph = async () => {
    if (text === "" || !text) {
      setError("Please enter some text.");
      return;
    }

    setError("");
    const newDocument = [...document];
    newDocument[chosenParagraph] = text;
    setDocument([...newDocument]);
    setText("");
    setChosenParagraph(document.length);
  };

  return (
    <>
      <Head>
        <title> Speak </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Speak</span>
          </h1>
          <div className="mt-5 flex h-[100%] w-screen flex-row justify-center overflow-auto overflow-y-auto px-4 text-2xl">
            <div className="m-[2%] flex w-[40%] flex-col justify-start overflow-auto">
              <div className="mb-5 h-[600px] w-full overflow-auto rounded-lg bg-[#16181a]">
                {document.map((item, index) => (
                  <div
                    key={index}
                    className="m-4 flex w-[90%] flex-col rounded-md bg-[#042f14] p-4"
                  >
                    <div
                      className={
                        "cursor-pointer text-sm font-bold text-[#3ad67d]"
                      }
                      onClick={() => {
                        setChosenParagraph(index);
                        setText(item);
                      }}
                    >
                      {" "}
                      Paragraph {index + 1}{" "}
                    </div>
                    <div
                      className={"cursor-pointer text-xl text-[#3ad67d]"}
                      onClick={() => {
                        setChosenParagraph(index);
                        setText(item);
                      }}
                    >
                      {" "}
                      {item}{" "}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex w-[50%] flex-col justify-start overflow-y-auto px-4 text-2xl">
              {hasHydrated && <Microphone setText={setText} />}
              <Textarea
                label="Speak/Write your thoughts"
                placeholder="Enter your amazing ideas."
                value={text}
                disabled={summaryQuery.isLoading}
                onChange={(e) => setText(e.target.value)}
                className="mb-10"
              />
              {error !== "" && <Text color="error"> {error} </Text>}
              <Box className="flex flex-row justify-around">
                <Button
                  onClick={async () => await generateQuery("concise")}
                  shadow
                  color="gradient"
                  size="md"
                >
                  {summaryQuery.isLoading ? (
                    <Loading color="currentColor" size="sm" />
                  ) : (
                    "Make Consise"
                  )}
                </Button>
                <Button
                  onClick={async () => await generateQuery("sophisticated")}
                  shadow
                  color="gradient"
                  size="md"
                >
                  {summaryQuery.isLoading ? (
                    <Loading color="currentColor" size="sm" />
                  ) : (
                    "Make Sophisticated"
                  )}
                </Button>
                <Button
                  onClick={async () =>
                    await generateQuery("grammatically correct")
                  }
                  shadow
                  color="gradient"
                  size="md"
                >
                  {summaryQuery.isLoading ? (
                    <Loading color="currentColor" size="sm" />
                  ) : (
                    "Spell Check"
                  )}
                </Button>
                <Button
                  onClick={saveParagraph}
                  shadow
                  color="gradient"
                  size="md"
                >
                  {summaryQuery.isLoading ? (
                    <Loading color="currentColor" size="sm" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
