import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FormField = ({ label, name, type = "text", value, onChange, placeholder, required = false, className = "w-full" }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} />
    </div>
  );
};
