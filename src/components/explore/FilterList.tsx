import React from 'react';
import { CheckIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import type { FilterGroup } from '../../utils/filters';
import type { Filters, FilterType } from '../../types/app';

interface FilterListProps {
  groups: FilterGroup[];
  selected: Filters;
  onToggle: (type: FilterType, value: string) => void;
}

export function FilterList({ groups, selected, onToggle }: FilterListProps) {
  const { t } = useApp();
  return (
    <div className="space-y-8">
      {groups.map((g) =>
      <fieldset key={g.type}>
          <legend className="mb-2.5 flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            {t(g.labelKey)}
            {selected[g.type].size > 0 &&
          <span className="rounded-full bg-accent px-1.5 font-mono text-[10px] leading-4 tracking-normal text-accent-fg">{selected[g.type].size}</span>
          }
          </legend>
          <ul className="space-y-px">
            {g.options.map((o) => {
            const checked = selected[g.type].has(o.value);
            return (
              <li key={o.value}>
                  <label
                  className={`-mx-2 flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-[7px] text-sm transition-colors duration-150 ease-out ${
                  checked ? 'bg-accent-soft font-medium text-accent' : 'text-ink hover:bg-sunken'}`
                  }>
                  
                    <span className="relative flex h-4 w-4 shrink-0">
                      <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(g.type, o.value)}
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded-[4px] border-[1.5px] border-line-strong bg-surface transition-colors duration-150 checked:border-accent checked:bg-accent hover:border-accent" />
                    
                      <CheckIcon
                      strokeWidth={3.5}
                      className="pointer-events-none absolute inset-0 m-auto h-2.5 w-2.5 text-accent-fg opacity-0 transition-opacity duration-100 peer-checked:opacity-100" />
                    
                    </span>
                    <span className="min-w-0 flex-1 truncate">{o.label}</span>
                    <span className={`font-mono text-xs tabular-nums ${checked ? 'text-accent' : 'text-muted'}`}>{o.count}</span>
                  </label>
                </li>);

          })}
          </ul>
        </fieldset>
      )}
    </div>);

}