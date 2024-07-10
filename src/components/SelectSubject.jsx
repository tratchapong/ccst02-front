import {  useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useHomework } from "../stores/store";

export function SelectSubject({onChange, value}) {
  
  const subject = useHomework((state) => state.subject);
  const getSubject = useHomework((state) => state.getSubject);

  useEffect(() => {
    getSubject();
  }, []);
  return (
    <Select onValueChange={onChange} value={value+''}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subject</SelectLabel>
          { subject.map( el => (
            <SelectItem key={el.value} value={el.value+''}>{el.text}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
