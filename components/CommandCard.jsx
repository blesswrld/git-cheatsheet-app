"use client";

import { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
    ChevronUpIcon,
    ClipboardIcon,
    CheckIcon,
    StarIcon as StarIconOutline, // Пустая звезда
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"; // Заполненная звезда

// Добавляем пропсы: id, isFavorite, onToggleFavorite
export default function CommandCard({
    id,
    command,
    description,
    example,
    isFavorite,
    onToggleFavorite,
}) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(command).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div
            className="w-full rounded-xl border p-4 transition-colors
                       bg-white border-slate-200
                       dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10
                       backdrop-blur-lg"
        >
            <div className="flex w-full items-start justify-between">
                <div className="flex-1 pr-4">
                    <p className="break-all font-mono text-sky-600 dark:text-sky-400">
                        {command}
                    </p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {/* Кнопка "Избранное" */}
                    <button
                        onClick={() => onToggleFavorite(id)}
                        className="flex-shrink-0 rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
                                   hover:bg-slate-100 dark:hover:bg-white/10"
                        aria-label="Добавить в избранное"
                    >
                        {isFavorite ? (
                            <StarIconSolid className="h-5 w-5 text-yellow-400" />
                        ) : (
                            <StarIconOutline className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                        )}
                    </button>

                    <button
                        onClick={handleCopy}
                        className="flex-shrink-0 rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
                                   hover:bg-slate-100 dark:hover:bg-white/10"
                        aria-label="Скопировать команду"
                    >
                        {isCopied ? (
                            // Иконка "успех" - зеленая
                            <CheckIcon className="h-5 w-5 text-green-500" />
                        ) : (
                            // Обычная иконка - серая
                            <ClipboardIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                        )}
                    </button>
                </div>
            </div>

            {example && (
                <div className="mt-4 w-full">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button
                                    className="flex w-full items-center justify-between rounded py-1 text-sm text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
                                                          hover:text-black dark:hover:text-white"
                                >
                                    <span>Показать пример</span>
                                    <ChevronUpIcon
                                        className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                                            open ? "rotate-180" : ""
                                        }`}
                                    />
                                </Disclosure.Button>

                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform opacity-0"
                                    enterTo="transform opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform opacity-100"
                                    leaveTo="transform opacity-0"
                                >
                                    <Disclosure.Panel
                                        className="mt-2 rounded-lg p-3 text-sm 
                                                               bg-slate-100 text-slate-700
                                                               dark:bg-black/20 dark:text-slate-300
                                                               backdrop-blur-sm"
                                    >
                                        <pre className="whitespace-pre-wrap font-mono">
                                            {example}
                                        </pre>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                </div>
            )}
        </div>
    );
}
