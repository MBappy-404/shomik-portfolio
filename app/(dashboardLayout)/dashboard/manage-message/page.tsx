/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */

import ContactMessages from "@/components/Dashboard/Message/MessageCard";
import { getALlMessage } from "@/lib/query/project";

/* eslint-disable @typescript-eslint/no-unused-vars */
const ManageMessagePage = async () => {
  const messages = await getALlMessage();
  // console.log(messages);
  
  return (
    <div>
      <ContactMessages messages={messages?.data} />
    </div>
  );
};

export default ManageMessagePage;
