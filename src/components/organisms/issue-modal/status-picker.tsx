import { Select, SelectItem } from '@/components/atoms/select';
import { StatusIcon } from '@/components/atoms/icon/status-icon';
import { CheckIcon } from '@/components/atoms/icon/check-icon';
import { useStatusPicker, type UseStatusPickerProps } from '@/hooks/use-status-picker';

export type StatusPickerProps = UseStatusPickerProps;

export function StatusPicker(props: StatusPickerProps) {
  const { statuses, selectedStatus, handleSelect, handleContentKeyDown } = useStatusPicker(props);

  return (
    <div className="flex w-[230px] flex-col p-1.5 select-none">
      <Select
        value={selectedStatus}
        onValueChange={(val) => {
          const found = statuses.find((s) => s.id === val);
          if (found) handleSelect(found);
        }}
        onKeyDown={handleContentKeyDown}
        className="gap-0.5"
      >
        {statuses.map(({ id, name, shortcut }) => (
          <SelectItem key={id} value={id}>
            {({ selected }) => (
              <>
                <StatusIcon status={id} className="size-4" />
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

export default StatusPicker;
