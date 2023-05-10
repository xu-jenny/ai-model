import React, { useState } from 'react';
import { serverFunctions } from '../../utils/serverFunctions';
import { setSalesHire } from './ServerPlayground';

type MessengerType = 'user' | 'assistant';

type Message = {
  role: MessengerType;
  content: string;
};

const AIMessage = ({ content }: { content: string }) => (
  <p className="mr-auto bg-gray-500 rounded-lg p-2 text-white w-fit max-w-[80%] text-xs">
    {content}
  </p>
);

const HumanMessage = ({ content }: { content: string }) => (
  <div className="ml-auto bg-blue-500 rounded-lg p-2 text-white w-fit max-w-[80%] text-xs">
    {content}
  </div>
);

const Spinner = () => (
  <div role="status">
    <svg
      aria-hidden="true"
      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Please describe your business.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const onSend = async () => {
    if (input != null && input.length > 0) {
      setLoading(true);
      const newMessage = { role: 'user', content: input } as Message;
      const data = {
        message: newMessage,
        history: messages,
      };
      console.log(JSON.stringify(data));
      setMessages([...messages, newMessage]);
      setInput('');
      //   let response = await fetch('http://127.0.0.1:3000/chat', {
      let response = await fetch(
        'https://t5tdnlosfh.execute-api.us-east-1.amazonaws.com/Prod/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .catch((error) => {
          console.error(error);
        });
      console.log(response);
      if (response != null && 'message' in response) {
        const exists = messages.some(
          (item) =>
            item.role === newMessage.role && item.content === newMessage.content
        );
        if (exists) {
          setMessages([
            ...messages,
            { role: 'assistant', content: response['message'] },
          ]);
        } else {
          setMessages([
            ...messages,
            newMessage,
            { role: 'assistant', content: response['message'] },
          ]);
        }
      } else {
        setMessages([
          ...messages,
          newMessage,
          {
            role: 'assistant',
            content:
              'There was an error with the request, please try again later',
          },
        ]);
      }
      setLoading(false);
    }
  };

  const setCell = async () => {
    const response = await serverFunctions.setCellContent('B2', '04/2021');
    console.log(response);
  };

  const setSales = async () => {
    const response = await serverFunctions.setActiveSheetCell();
    console.log(response);
  };

  return (
    <>
      <h3 className="justify-center items-center text-center text-xl">
        ☀️ Welcome to Enu! ☀️
      </h3>
      <div className="flex-grow overflow-y-auto">
        {messages.map((message) => (
          <div className="mt-2">
            {message.role == 'assistant' ? (
              <AIMessage content={message.content} />
            ) : (
              <HumanMessage content={message.content} />
            )}
          </div>
        ))}
        {loading && <Spinner />}
      </div>
      <div className="bg-white p-4 flex-shrink-0">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            disabled={loading == true}
            placeholder="Your message"
            onChange={(event) => setInput(event.target.value)}
            className="flex-grow rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
            onClick={onSend}
          >
            Send
          </button>
        </div>
      </div>
      <button onClick={setCell}>set cell</button>
      <button onClick={setSales}>set sales</button>
      <div>
        <button
          onClick={() => setSalesHire([
            ['90000', '4/21'],
            ['92000', '5/21'],
            ['94000', '6/21'],
          ])}
        >test sales</button>
      </div>
    </>
  );
};

export default Chat;
