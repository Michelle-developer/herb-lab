'use client';
import { useState } from 'react';
import { cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function ReusableDrawer({ openTrigger, title, className, children }) {
  const [open, setOpen] = useState(false);

  // 打開抽屜的按鈕 UI 由外部傳入 openTrigger，內部確認是合法 React 元素 => 複製 + 注入功能
  const enhancedTrigger = isValidElement(openTrigger)
    ? cloneElement(openTrigger, {
        onClick: (e) => {
          openTrigger.props.onClick?.(e); // 保留原事件
          setOpen(true); // 加上 Drawer 開啟功能
        },
      })
    : null;

  return (
    <div className="relative">
      {enhancedTrigger}

      {/* Drawer 本體 */}
      <Dialog open={open} onClose={setOpen} className="relative z-30">
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

                <div
                  className={clsx(
                    'flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl',
                    className
                  )}
                >
                  {title && (
                    <div className="px-4 sm:px-6">
                      <DialogTitle className="px-1 py-2 text-base font-semibold text-gray-900">
                        {title}
                      </DialogTitle>
                    </div>
                  )}
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">{children}</div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

ReusableDrawer.propTypes = {
  openTrigger: PropTypes.element.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
