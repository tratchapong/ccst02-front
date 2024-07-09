

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectList({list, onChange}) {
  return (
    <Select onValueChange={onChange} position='popper'>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subject</SelectLabel>
          { list.map( el => (
            <SelectItem key={el.value} value={el.value+''}>{el.text}</SelectItem>
          ))}

          {/* <SelectItem value="1">HTML</SelectItem>
          <SelectItem value="2">CSS</SelectItem>
          <SelectItem value="3">Javascript</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
