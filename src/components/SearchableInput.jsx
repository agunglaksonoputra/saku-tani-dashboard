import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

export const SearchableInput = ({ label, name, value, onChange, placeholder, options = [], onOptionSelect, required = false }) => {
  const [open, setOpen] = useState(false);
  const handleSelect = (optionName) => {
    onOptionSelect(optionName);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} />
        {options.length > 0 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" type="button">
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-1 w-full max-w-[300px]">
              {options.map((option) => (
                <button type="button" key={option.id} onClick={() => handleSelect(option.name)} className="w-full text-left px-2 py-1 hover:bg-muted rounded text-sm cursor-pointer">
                  {option.name}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
