import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function ConstitutionDetailAccordion({ constitution }) {
  const content = [
    { label: "體質特點", value: constitution.character },
    { label: "常見症狀", value: constitution.symptoms },
    { label: "發病趨勢", value: constitution.incidence_trend },
  ];

  return (
    <div className="w-full space-y-2">
      {content.map((data, idex) => (
        <Disclosure key={idex}>
          <DisclosureButton className="hover:bg-grass group text-grass flex w-full cursor-pointer items-center justify-between rounded-lg bg-stone-100 px-4 py-2 text-left font-semibold hover:text-stone-100">
            {data.label}
            <ChevronDownIcon className="w-5 group-data-open:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel className="text-gray-500">
            {data.value}
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  );
}
