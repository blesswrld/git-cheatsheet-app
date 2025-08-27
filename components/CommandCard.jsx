"use client";

import { useState, useMemo } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
    ChevronUpIcon,
    ClipboardIcon,
    CheckIcon,
    StarIcon as StarIconOutline, // Пустая звезда
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"; // Заполненная звезда
import { MergeViz } from "./visualizers/MergeViz";
import { RebaseViz } from "./visualizers/RebaseViz";
import { CommitViz } from "./visualizers/CommitViz";

// Карта визуализаций
const visualizationMap = {
    merge: <MergeViz />,
    rebase: <RebaseViz />,
    commit: <CommitViz />,
};

// Компонент для интерактивного конструктора
const InteractiveCommandBuilder = ({ parts, onCopy }) => {
    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (id, value) => {
        setInputValues((prev) => ({ ...prev, [id]: value }));
    };

    const finalCommand = useMemo(() => {
        return parts
            .map((part) => {
                if (part.type === "static") return part.value;
                if (part.type === "input")
                    return inputValues[part.id] || part.placeholder;
                return "";
            })
            .join("");
    }, [parts, inputValues]);

    return (
        <div>
            <div className="flex flex-wrap items-center gap-x-2 p-2 rounded-md bg-black/20 dark:bg-black/30">
                {parts.map((part, index) => {
                    if (part.type === "static") {
                        return (
                            <span
                                key={index}
                                className="font-mono text-sky-400"
                            >
                                {part.value}
                            </span>
                        );
                    }
                    if (part.type === "input") {
                        return (
                            <input
                                key={index}
                                type="text"
                                placeholder={part.placeholder}
                                className="bg-transparent border-b border-sky-400/50 focus:border-sky-400 focus:outline-none font-mono text-sky-300 placeholder-sky-600 px-1 flex-grow min-w-0"
                                style={{
                                    width: `${
                                        (part.placeholder.length || 10) * 8
                                    }px`,
                                }}
                                onChange={(e) =>
                                    handleInputChange(part.id, e.target.value)
                                }
                            />
                        );
                    }
                    return null;
                })}
            </div>
            <div className="mt-2 flex justify-end">
                <button
                    onClick={() => onCopy(finalCommand)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                    <ClipboardIcon className="h-4 w-4" />
                    Копировать собранную команду
                </button>
            </div>
        </div>
    );
};

// Основной компонент карточки
export default function CommandCard({ item, isFavorite, onToggleFavorite }) {
    // Добавляем пропсы
    const {
        id,
        command,
        description,
        example,
        interactiveParts,
        visualization,
    } = item;
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (textToCopy = command) => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="w-full rounded-xl border p-4 transition-colors bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-lg">
            <div className="flex w-full items-start justify-between">
                <div className="flex-1 pr-4">
                    {interactiveParts ? (
                        <InteractiveCommandBuilder
                            parts={interactiveParts}
                            onCopy={handleCopy}
                        />
                    ) : (
                        <p className="break-all font-mono text-sky-400">
                            {command}
                        </p>
                    )}
                    <p className="mt-2 text-slate-400">{description}</p>
                </div>
                <div className="flex items-center space-x-2">
                    {/* Кнопка "Избранное" */}
                    <button
                        onClick={() => onToggleFavorite(id)}
                        className="flex-shrink-0 rounded-md p-2 hover:bg-white/10 focus:outline-none ring-sky-500 focus-visible:ring-2"
                    >
                        {isFavorite ? (
                            <StarIconSolid className="h-5 w-5 text-yellow-400" />
                        ) : (
                            <StarIconOutline className="h-5 w-5 text-slate-400" />
                        )}
                    </button>
                    {!interactiveParts && (
                        <button
                            onClick={() => handleCopy()}
                            className="flex-shrink-0 rounded-md p-2 hover:bg-white/10 focus:outline-none ring-sky-500 focus-visible:ring-2"
                        >
                            {isCopied ? (
                                <CheckIcon className="h-5 w-5 text-green-400" />
                            ) : (
                                <ClipboardIcon className="h-5 w-5 text-slate-400" />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {visualization && (
                <div className="mt-4 p-2 bg-black/20 rounded-lg">
                    {visualizationMap[visualization]}
                </div>
            )}

            {example && (
                <div className="mt-4 w-full">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full items-center justify-between rounded py-1 text-sm text-slate-500 hover:text-white focus:outline-none ring-sky-500 focus-visible:ring-2">
                                    <span>Показать пример</span>
                                    <ChevronUpIcon
                                        className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                                            open ? "rotate-180" : ""
                                        }`}
                                    />
                                </Disclosure.Button>

                                <Transition
                                    as="div"
                                    enter="transition ease-out duration-100"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Disclosure.Panel className="mt-2 rounded-lg p-3 text-sm bg-black/20 text-slate-300 backdrop-blur-sm">
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
