import { Select, SelectItem } from '@/components/atoms/select';
import { PriorityIcon } from '@/components/atoms/icon/priority-icon';
import { CheckIcon } from '@/components/atoms/icon/check-icon';
import { usePriorityPicker, type UsePriorityPickerProps } from '@/hooks/use-priority-picker';

export type PriorityPickerProps = UsePriorityPickerProps;

export function PriorityPicker(props: PriorityPickerProps) {
  const { priorities, selectedPriority, handleSelect, handleContentKeyDown } = usePriorityPicker(props);

  return (
    <div className="flex w-[230px] flex-col p-1.5 select-none">
      <Select
        value={selectedPriority}
        onValueChange={(val) => {
          const found = priorities.find((p) => p.id === val);
          if (found) handleSelect(found);
        }}
        onKeyDown={handleContentKeyDown}
        className="gap-0.5"
      >
        {priorities.map(({ id, name, shortcut }) => (
          <SelectItem key={id} value={id}>
            {({ selected }) => (
              <>
                <PriorityIcon priority={id} className="size-4" />
                <span className="text-foreground flex-1 truncate">{name}</span>

                <div className="flex items-center gap-2">
                  {selected && <CheckIcon className="text-foreground size-3.5" />}
                  <span className="text-muted-foreground/60 text-xs font-normal">{shortcut}</span>
                </div>
              </>
            )}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

export default PriorityPicker;
