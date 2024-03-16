import { H1 } from "@/components/typograph";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SigniUpInput } from "@/constant/inputs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Signup = () => {
  const form = useForm();
  const navigate = useNavigate();
  const onsubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="container grid h-screen place-items-center">
      <form
        className="m-auto max-w-[500px] w-full"
        onSubmit={form.handleSubmit(onsubmit)}
      >
        <H1 className="text-center">Sign up</H1>
        <div className="grid gap-5">
          {SigniUpInput.map((input) => {
            switch (input.type) {
              case "text":
                return (
                  <div key={input.name}>
                    <Label>{input.placeholder}</Label>
                    <Input placeholder={input.placeholder} name={input.name} />
                  </div>
                );
              case "option":
                return (
                  <div key={input.name}>
                    <Label>{input.placeholder}</Label>
                    <Select name={input.name}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={input.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {input.options?.map((option) => (
                          <SelectItem value={option} key={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              default:
                return null; // Handle other types or invalid types
            }
          })}
        </div>
        <div className="flex justify-center my-10 ">
          <Button className="w-full">Let&apos;s goo!!!</Button>
        </div>
        <Button
          variant="link"
          className="float-right capitalize"
          type="button"
          onClick={() => navigate("/signin")}
        >
          Already have an account?
        </Button>
      </form>
    </div>
  );
};

export default Signup;
