"use client";

import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import commandsData from "../data/git-commands.json";
import CommandCard from "../components/CommandCard";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

export default function HomePage() {
    const [query, setQuery] = useState("");

    const filteredCommands =
        query === ""
            ? commandsData
            : commandsData.filter((item) =>
                  `${item.description} ${item.command} ${item.keywords.join(
                      " "
                  )}`
                      .toLowerCase()
                      .includes(query.toLowerCase())
              );

    return (
        <main className="min-h-screen text-slate-800 dark:text-slate-200">
            <div className="container mx-auto max-w-3xl p-4 sm:p-8">
                <div className="flex justify-end mb-4">
                    <ThemeSwitcher />
                </div>

                <header className="text-center my-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white">
                        Интерактивная Git Шпаргалка
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Найди нужную команду, не покидая терминал.
                    </p>
                </header>

                <Combobox>
                    <div className="relative">
                        <MagnifyingGlassIcon className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-slate-400 dark:text-slate-500" />
                        <Combobox.Input
                            onChange={(event) => setQuery(event.target.value)}
                            className="w-full bg-slate-100 border-slate-300 text-black placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none focus:border-green-500 rounded-md py-3 pl-11 pr-4 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                            placeholder="Что вы хотите сделать? (напр. 'отменить коммит')"
                        />
                    </div>
                </Combobox>

                <section className="space-y-4 mt-8">
                    {filteredCommands.length > 0 ? (
                        filteredCommands.map(
                            ({ id, command, description, example }) => (
                                <CommandCard
                                    key={id}
                                    command={command}
                                    description={description}
                                    example={example}
                                />
                            )
                        )
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-500 dark:text-slate-400">
                                Команды не найдены.
                            </p>
                            <p className="text-slate-400 dark:text-slate-600 text-sm">
                                Попробуйте другой запрос или проверьте опечатки.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
