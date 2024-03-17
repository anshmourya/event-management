import { P } from "components/typograph";

interface errorMessage {
  message: string;
}

const ErrorMessage = ({ message }: errorMessage) => {
  if (!message) {
    return null;
  }
  return <P className="mt-2 text-base text-red-500 capitalize">{message}</P>;
};

export default ErrorMessage;
