
import React from "react";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  ListOrdered,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleCommand = (command: string) => {
    if (!textAreaRef.current) return;

    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText = value;
    let newCursorPos = end;

    switch (command) {
      case 'bold':
        newText = value.substring(0, start) + `<strong>${selectedText}</strong>` + value.substring(end);
        newCursorPos = end + 17; // length of <strong></strong>
        break;
      case 'italic':
        newText = value.substring(0, start) + `<em>${selectedText}</em>` + value.substring(end);
        newCursorPos = end + 9; // length of <em></em>
        break;
      case 'underline':
        newText = value.substring(0, start) + `<u>${selectedText}</u>` + value.substring(end);
        newCursorPos = end + 7; // length of <u></u>
        break;
      case 'alignLeft':
        newText = value.substring(0, start) + `<div style="text-align: right;">${selectedText}</div>` + value.substring(end);
        newCursorPos = end + 35; // length of wrapping
        break;
      case 'alignCenter':
        newText = value.substring(0, start) + `<div style="text-align: center;">${selectedText}</div>` + value.substring(end);
        newCursorPos = end + 37; // length of wrapping
        break;
      case 'alignRight':
        newText = value.substring(0, start) + `<div style="text-align: left;">${selectedText}</div>` + value.substring(end);
        newCursorPos = end + 36; // length of wrapping
        break;
      case 'orderedList':
        if (selectedText.includes('\n')) {
          const lines = selectedText.split('\n');
          const liItems = lines.map(line => `<li>${line}</li>`).join('');
          newText = value.substring(0, start) + `<ol>${liItems}</ol>` + value.substring(end);
        } else {
          newText = value.substring(0, start) + `<ol><li>${selectedText}</li></ol>` + value.substring(end);
        }
        newCursorPos = end + 12; // approximate
        break;
      case 'unorderedList':
        if (selectedText.includes('\n')) {
          const lines = selectedText.split('\n');
          const liItems = lines.map(line => `<li>${line}</li>`).join('');
          newText = value.substring(0, start) + `<ul>${liItems}</ul>` + value.substring(end);
        } else {
          newText = value.substring(0, start) + `<ul><li>${selectedText}</li></ul>` + value.substring(end);
        }
        newCursorPos = end + 12; // approximate
        break;
      default:
        return;
    }
    
    onChange(newText);
    
    // Set cursor position after state update
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="border rounded-md">
      <div className="p-2 bg-muted flex flex-wrap gap-2 border-b">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand('bold')}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">عريض</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand('italic')}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">مائل</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand('underline')}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
          <span className="sr-only">تحته خط</span>
        </Button>
        <div className="h-4 w-px bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand('alignRight')}
          className="h-8 w-8 p-0"
        >
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">محاذاة لليسار</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand('alignCenter')}
          className="h-8 w-8 p-0"
        >
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">محاذاة للوسط</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand('alignLeft')}
          className="h-8 w-8 p-0"
        >
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">محاذاة لليمين</span>
        </Button>
        <div className="h-4 w-px bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand('orderedList')}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">قائمة مرقمة</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleCommand('unorderedList')}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
          <span className="sr-only">قائمة نقطية</span>
        </Button>
      </div>
      <Textarea
        ref={textAreaRef}
        value={value}
        onChange={handleChange}
        className={cn("border-0 focus-visible:ring-0 rounded-t-none min-h-[200px]", className)}
        dir="rtl"
        {...props}
      />
    </div>
  );
};

export default TextEditor;
