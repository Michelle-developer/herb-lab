"use client";

import ReusableDrawer from "../../components/ReusableDrawer";
import { useHerbContext } from "../../contexts/HerbContext";
import HerbFilterNature from "./HerbFilterNature";
import HerbFilterTaste from "./HerbFilterTaste";
import HerbCategorySelector from "./HerbCategorySelector";

function HerbSidebarDrawer() {
  const { queryState } = useHerbContext();

  return (
    <ReusableDrawer
      title="中藥分類條件"
      trigger={
        <button className="ring-land relative flex w-24 justify-around rounded-full bg-gray-950/5 px-4 py-1.5 text-right text-lg font-semibold text-stone-600 hover:bg-gray-950/10 focus:ring-2 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-funnel-plus-icon lucide-funnel-plus"
          >
            <path d="M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348" />
            <path d="M16 6h6" />
            <path d="M19 3v6" />
          </svg>
          篩選
        </button>
      }
      className="bg-[url(/images/img_drawer.png)] bg-cover bg-center"
    >
      <HerbCategorySelector />
      {queryState.activeCategory === "all" && <p>無預設分類</p>}
      {queryState.activeCategory === "nature" && <HerbFilterNature />}
      {queryState.activeCategory === "taste" && <HerbFilterTaste />}
    </ReusableDrawer>
  );
}

export default HerbSidebarDrawer;

// export default function HerbSidebarDrawer({ className }) {
//   const [open, setOpen] = useState(false);
//   const { queryState } = useHerbContext();

//   return (
//     <div className={className}>
//       <button
//         onClick={() => setOpen(true)}
//         className="relative w-24 rounded-full bg-gray-950/5 px-4 py-2 text-right text-lg font-semibold text-stone-600 ring-amber-500 hover:bg-gray-950/10 md:text-xl lg:text-2xl"
//       >
//         {/* 打開抽屜的按鈕 */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="absolute top-3 left-4 size-6 stroke-stone-600"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
//           />
//         </svg>
//         篩選
//       </button>
//       <Dialog open={open} onClose={setOpen} className="relative z-10">
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
//         />

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
//               <DialogPanel
//                 transition
//                 className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
//               >
//                 <TransitionChild>
//                   <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
//                     <button
//                       type="button"
//                       onClick={() => setOpen(false)}
//                       className="relative rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
//                     >
//                       <span className="absolute -inset-2.5" />
//                       <span className="sr-only">Close panel</span>
//                       <XMarkIcon aria-hidden="true" className="size-6" />
//                     </button>
//                   </div>
//                 </TransitionChild>
//                 <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
//                   <div className="p-6">
//                     <DialogTitle className="fix ml-4 text-base font-semibold text-gray-900">
//                       中藥分類條件
//                     </DialogTitle>
//                   </div>
//                   <div className="relative mt-4 ml-6 flex-1 px-4 sm:px-6">
//                     <HerbCategorySelector />
//                     {queryState.activeCategory === "all" && <p>無預設分類</p>}
//                     {queryState.activeCategory === "nature" && (
//                       <HerbFilterNature />
//                     )}
//                     {queryState.activeCategory === "taste" && (
//                       <HerbFilterTaste />
//                     )}
//                   </div>
//                 </div>
//               </DialogPanel>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// }
