/* eslint-disable prettier/prettier */
import { TMessage } from "@/types";

/* eslint-disable prettier/prettier */
const ContactMessages = ({ messages }: {messages: TMessage[]}) => {
  return (
    <div className="max-w-full mx-auto bg-white shadow-lg border border-gray-200 rounded-lg p-3 md:p-5 dark:bg-gray-950 dark:border-gray-700">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Manage Messages 
          </h2>

      <div className="space-y-4  pt-8  ">
        {messages.length > 0 ? (
          messages.map((msg : TMessage, index : number) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {msg.name}
                </h3>
                <div className="flex flex-col">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {msg.email}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {msg.createdAt.slice(0, 10)}
                </span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                <strong>Subject:</strong> {msg.subject}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {msg.message}
                
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No messages yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactMessages;