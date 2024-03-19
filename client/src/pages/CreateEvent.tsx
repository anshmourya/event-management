import MultiDate from "@/components/date/MultiDate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { eventInputs } from "@/constant/inputs";
import { useForm } from "react-hook-form";

const CreateEvent = () => {
  const { control, handleSubmit } = useForm();
  const onsubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="w-full">
      {eventInputs.map((event) => {
        switch (event.type) {
          case "text":
          case "number":
            return (
              <>
                <Label>{event.label}</Label>
                <Input
                  control={control}
                  name={event.name}
                  placeholder={event.placeholder}
                  className="py-[20px] my-3"
                />
              </>
            );
          case "date":
            return (
              <>
                <Label>Please Select the Start And End Date</Label>
                <MultiDate
                  control={control}
                  name="date"
                  className="w-full my-3"
                />
              </>
            );
          case "file":
            return (
              <>
                <Label>{event.label}</Label>
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  className="block w-full my-3 text-sm border border-gray-200 rounded-lg shadow-sm focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                  placeholder={event.placeholder}
                />
              </>
            );
          default:
            return null; // Or handle other types as needed
        }
      })}
      <button>sss</button>
    </form>
  );
};

export default CreateEvent;
