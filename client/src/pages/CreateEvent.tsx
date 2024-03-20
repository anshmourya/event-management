import MultiDate from "@/components/date/MultiDate";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { eventInputs } from "@/constant/inputs";
import useEvent from "@/hooks/useEvent";
import eventSchema from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateEvent = () => {
  const { createEvent } = useEvent();
  const { control, handleSubmit, formState, register } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const eventHandler = useMutation({
    mutationKey: ["eventHandler"],
    mutationFn: createEvent,
  });

  const onsubmit = (data) => {
    const { date, thumbnail, ...rest } = data;
    const { from, to } = date;
    const start_date = new Date(from);
    const end_date = new Date(to);
    console.log({
      start_date,
      end_date,
      thumbnail: thumbnail[0],
      ...rest,
    });

    toast.promise(
      eventHandler.mutateAsync({
        start_date,
        end_date,
        thumbnail: thumbnail[0],
        ...rest,
      }),
      {
        loading: "creating the event",
        error: "error creating the event try again",
        success: "event created successfully",
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="w-full">
      <div>
        {eventInputs.map((event) => {
          switch (event.type) {
            case "text":
            case "number":
              return (
                <div key={event.name}>
                  <Label>{event.label}</Label>
                  <Input
                    control={control}
                    name={event.name}
                    placeholder={event.placeholder}
                    className="py-[20px] my-3"
                  />
                </div>
              );
            case "date":
              return (
                <div key={event.name}>
                  <Label>Please Select the Start And End Date</Label>
                  <MultiDate
                    control={control}
                    name="date"
                    className="w-full my-3"
                  />
                </div>
              );
            case "file":
              return (
                <div key={event.name}>
                  <Label>{event.label}</Label>
                  <input
                    type="file"
                    name="thumbnail"
                    {...register("thumbnail")}
                    className="block w-full my-3 text-sm border border-gray-200 rounded-lg shadow-sm focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                    placeholder={event.placeholder}
                    accept="image/*"
                  />
                  <ErrorMessage
                    message={formState?.errors["thumbnail"]?.message.toString()}
                  />
                </div>
              );
            default:
              return null; // Or handle other types as needed
          }
        })}
      </div>
      <Button>Create</Button>
    </form>
  );
};

export default CreateEvent;
