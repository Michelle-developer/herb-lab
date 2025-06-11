"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import HerbFilterNature from "./HerbFilterNature";
import { useHerbContext } from "../../contexts/HerbContext";

export default function HerbSidebarDrawer({ className }) {
  const [open, setOpen] = useState(false);
  const { queryDispatch } = useHerbContext();

  return (
    <div className={className}>
      <button
        onClick={() => setOpen(true)}
        className="relative w-24 rounded-full bg-gray-950/5 px-4 py-2 text-right text-lg font-semibold text-stone-600 ring-amber-500 hover:bg-gray-950/10 md:text-xl lg:text-2xl"
      >
        {/* 打開抽屜的按鈕 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute top-3 left-4 size-6 stroke-stone-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
        篩選
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="p-6">
                    <DialogTitle className="fix ml-4 text-base font-semibold text-gray-900">
                      藥材篩選條件
                    </DialogTitle>
                  </div>
                  <div className="relative mt-4 ml-6 flex-1 px-4 sm:px-6">
                    <HerbFilterNature />
                    <button
                      type="button"
                      className="bg-grass border-grass mt-4 w-full rounded-full border-solid p-2 text-stone-100"
                      onClick={() => queryDispatch({ type: "clearFilter" })}
                    >
                      清除分類條件
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
