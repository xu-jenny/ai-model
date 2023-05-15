import React, { useState } from 'react';
import Spinner from './Spinner'
import { serverFunctions } from '../../utils/serverFunctions';
import { processMessage } from '../processMessage';
import { Company } from "./Company"

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

const FIRST_MESSAGE = `Hi! I'm helping you build a financial model today. To start, can you please provide me with the following information?\n
1. Name of your business?\n
2. What type of business is it?\n
3. Why do you want to construct a financial model?\n
4. What is the start date of the model?\n
`

const Chat = ({company}: {company: Company}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: FIRST_MESSAGE,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("1")

  const handleNewStage = (stage: string) => setStage(stage)

  const onSend = async () => {
    if (input != null && input.length > 0) {
      setLoading(true);
      const newMessage = { role: 'user', content: input } as Message;
      const data = {
        message: newMessage,
        history: messages,
        stage: stage,
      };
      setMessages([...messages, newMessage]);
      setInput('');
      let response = await fetch('http://127.0.0.1:3000/chat', {
        // let response = await fetch(
        //   'https://t5tdnlosfh.execute-api.us-east-1.amazonaws.com/Prod/chat',
        //   {
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
      
        console.log(response)
      if (response != null && 'message' in response) {
        console.log("summary" in response)
        if("summary" in response){
          switch (stage) {
            case "1":
              console.log("stage 1 complete!")
              console.log(response["summary"])
              serverFunctions.setCellContent("A1", response["summary"]["business_name"])
              break;
            case "2":
              company.processSales(response["summary"])
              let temp = company.getSalesMetaData()
              console.log(temp)
              serverFunctions.setSalesSheetMetaData(temp)
              serverFunctions.highlightSalesCells('metadata')
              break;
            default: {
              console.log("default", response["summary"])
              break;
            }
          }
        }
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
      if (response != null && "stage" in response && response["stage"] != stage){
        handleNewStage(response["stage"])
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
      <div className="flex-grow overflow-y-auto h-full">
        {messages.map((message, index) => (
          <div className="mt-2">
            {message.role == 'assistant' ? (
              <AIMessage key={index} content={message.content} />
            ) : (
              <HumanMessage key={index} content={message.content} />
            )}
          </div>
        ))}
        {loading && <Spinner />}
      </div>
      <div className="absolute bottom-0 bg-white p-4 flex-shrink-0 sticky">
        <div className="flex space-x-2 bottom-0">
          <textarea
            value={input}
            disabled={loading == true}
            placeholder="Your message"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if ((event.key === "Enter" && event.metaKey) && input.trim() !== "") {
                onSend();
              }
            }}
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
      {/* <button onClick={setCell}>set cell</button>
      <button onClick={setSales}>set sales</button>
      <div>
        <button
          onClick={() => setSalesHire([
            ['90000', '4/21'],
            ['92000', '5/21'],
            ['94000', '6/21'],
          ])}
        >test sales</button>
      </div> */}
    </>
  );
};

export default Chat;
