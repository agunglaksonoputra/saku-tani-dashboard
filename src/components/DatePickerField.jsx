import React from "react";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {format} from "date-fns";
import {id} from "date-fns/locale";

export const DatePickerField = ({selectedDate, onDateSelect, label = "Tanggal"}) => {
    return (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {selectedDate ? format(selectedDate, "PPP", {locale: id}) : "Pilih tanggal"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={onDateSelect}
                        locale={id}
                        initialFocus
                        disabled={(date) => date > new Date()} // hanya sampai hari ini
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
