import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Komponen input biasa
export const FormField = ({ label, name, type = "text", value, onChange, placeholder, required = false, className = "w-full" }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} />
    </div>
  );
};

// Komponen input dengan tombol (contoh: Max)
export const FormFieldWithButton = ({ label, name, type = "text", value, onChange, placeholder, required = false, className = "w-full", buttonLabel = "Button", onButtonClick }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <div className="flex gap-2">
        <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="flex-1" />
        <Button type="button" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
