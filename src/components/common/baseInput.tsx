import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InputHTMLAttributes } from "react";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  label: string;
}

export default function BaseInput({
  required = false,
  label,
  ...props
}: BaseInputProps) {
  return (
    <div>
      <Label>
        {label} {required && <b className="text-red-500">*</b>}
      </Label>
      <Input {...props} />
    </div>
  );
}
