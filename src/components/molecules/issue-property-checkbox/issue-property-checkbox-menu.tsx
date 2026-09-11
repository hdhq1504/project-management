import type { ReactNode } from 'react';
import { CheckboxGroup, CheckboxGroupItem } from '@/components/molecules/checkbox-group';

type CheckboxMenuItem = {
  id: string;
  name: string;
};

type IssuePropertyCheckboxMenuProps<T extends CheckboxMenuItem> = {
  items: readonly T[];
  value: readonly string[];
  onValueChange: (value: string[]) => void;
  renderIcon: (item: T) => ReactNode;
};

function IssuePropertyCheckboxMenu<T extends CheckboxMenuItem>({
  items,
  value,
  onValueChange,
  renderIcon
}: IssuePropertyCheckboxMenuProps<T>) {
  return (
    <div className="flex w-[230px] flex-col select-none">
      <CheckboxGroup
        name="property-checkbox-menu"
        value={[...value]}
        onValueChange={onValueChange}
        className="flex max-h-60 flex-col gap-0.5 overflow-y-auto p-1.5"
      >
        {items.map((item) => (
          <CheckboxGroupItem key={item.id} value={item.id}>
            {renderIcon(item)}
            <span className="text-foreground min-w-0 truncate text-[13px] font-medium">{item.name}</span>
          </CheckboxGroupItem>
        ))}
        {items.length === 0 && <p className="text-muted-foreground px-2 py-1.5 text-xs">No items</p>}
      </CheckboxGroup>
    </div>
  );
}

export { IssuePropertyCheckboxMenu };
