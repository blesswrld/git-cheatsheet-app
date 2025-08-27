"use client";

import { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
    ChevronUpIcon,
    ClipboardIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";

export default function CommandCard({ command, description, example }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(command).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="w-full rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex w-full items-start justify-between">
                <div className="flex-1 pr-4">
                    <p className="break-all font-mono text-green-600 dark:text-green-400">
                        {command}
                    </p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex-shrink-0 rounded-md p-2 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 dark:hover:bg-slate-800"
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

            {example && (
                <div className="mt-4 w-full">
                    <Disclosure>
                        {({ open }) => (
                            <div>
                                <Disclosure.Button className="flex w-full items-center justify-between rounded py-1 text-sm text-slate-500 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 dark:hover:text-white">
                                    <span>Показать пример</span>
                                    <ChevronUpIcon
                                        className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                                            open ? "rotate-180" : ""
                                        }`}
                                    />
                                </Disclosure.Button>

                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="mt-2 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                                        <pre className="whitespace-pre-wrap font-mono">
                                            {example}
                                        </pre>
                                    </Disclosure.Panel>
                                </Transition>
                            </div>
                        )}
                    </Disclosure>
                </div>
            )}
        </div>
    );
}
