import React, { useContext, useEffect, useRef, useState } from 'react';
import Spinner from './Spinner';
import { serverFunctions } from '../../utils/serverFunctions';
import { processMessage } from '../processMessage';
import { Company } from './Company';
import CompanyContext from './CompanyContext';

type MessengerType = 'user' | 'assistant';

type Message = {
  role: MessengerType;
  content: string;
};

/**
 * 
* todos: a
1. auto scroll chat bar when chatting. pin input bar to bottom
 */

const AIMessage = ({ content }: { content: string }) => (
  <p className="mr-auto bg-gray-500 rounded-lg p-2 text-white w-fit max-w-[80%] text-xs whitespace-pre-wrap">
    {content}
  </p>
);

const HumanMessage = ({ content }: { content: string }) => (
  <div className="ml-auto bg-blue-500 rounded-lg p-2 text-white w-fit max-w-[80%] text-xs">
    {content}
  </div>
);

const FIRST_MESSAGE = `Hi! I'm helping you build a financial model today. To start, can you please provide me with the following information?
1. Name of your business?
2. What type of business is it?
3. Why do you want to construct a financial model?
4. What is the start date of the model?
5. What is your revenue model? Choose one of the following: SaaS subscription, Price per User, Professional Services or Other
`;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: FIRST_MESSAGE,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<string | number>('1');
  const { company } = useContext(CompanyContext);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onSend = async () => {
    if (input != null && input.length > 0) {
      setLoading(true);
      const newMessage = { role: 'user', content: input } as Message;
      const data = {
        message: newMessage,
        history: messages,
        stage: stage.toString(),
        company: company,
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
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error(error);
        });

      console.log(response);
      console.log('current Stage: ', stage);
      if (response != null && 'message' in response) {
        console.log('summary' in response);
        if ('summary' in response) {
          console.log('summary is in response, current stage is ', stage);
          if (stage == '1' || stage == 1) {
            console.log('stage 1 complete!');
            console.log(response['summary']);
            company.processBasic(response['summary']);
            console.log('new stage: ', response['stage']);
            setStage(response['stage']);
          } else if (stage == '2' || stage == 2) {
            console.log('stage 2 complete!');
            company.processSales(response['summary']);
            let temp = company.getSalesMetaData();
            // todo: navigate to sales tab and walk through
            serverFunctions.setSalesSheetMetaData(temp);
            // serverFunctions.highlightSalesCells('metadata');
            console.log('new stage: ', response['stage']);
            setStage(response['stage']);
          } else if (stage == '3' || stage == 3) {
            console.log('stage 3 complete!');
            company.processPricePerUser(response['summary']);
            serverFunctions.setPricePerUser(company.getPricePerUserData());
            console.log('new stage: ', response['stage']);
            setStage(response['stage']);
            // todo: navigate to acv tab and walk through
          } else if (stage == '6' || stage == 6) {
            console.log('stage 6 complete!');
            company.processExpenses(response['summary']);
            serverFunctions.setExpenses(company.getExpenses());
            console.log('new stage: ', response['stage']);
            setStage(response['stage']);
          } else if (stage == '7' || stage == 7) {
            console.log('stage 7 complete!');
            company.processCash(response['summary']);
            serverFunctions.setIncome(company.getIncome());
            console.log('new stage: ', response['stage']);
            setStage(response['stage']);
            // todo: navigate to explore tab and walk through
          } else {
            console.log('default', response['summary']);
          }
        }

        // const exists = messages.some(
        //   (item) =>
        //     item.role === newMessage.role && item.content === newMessage.content
        // );
        // if (exists) {
        //   setMessages([
        //     ...messages,
        //     { role: 'assistant', content: response['message'] },
        //   ]);
        // } else {
        //   setMessages([
        //     ...messages,
        //     newMessage,
        //     { role: 'assistant', content: response['message'] },
        //   ]);
        // }
      }
      // else {
      //   setMessages([
      //     ...messages,
      //     newMessage,
      //     {
      //       role: 'assistant',
      //       content:
      //         'There was an error with the request, please try again later',
      //     },
      //   ]);
      // }
      setMessages([
        ...messages,
        newMessage,
        { role: 'assistant', content: response['message'] },
      ]);
      setLoading(false);
    }
  };

  const setCell = async () => {
    const response = await serverFunctions.setCellContent('B2', '04/2021');
    console.log(response);
  };

  const setSales = async () => {
    let summary = {
      monthly_user_acquisition_spend: 150,
      ad_spend_per_install: 2,
      monthly_price_per_user: 5,
      growth_rate: 0.3,
      churn_rate: 0.2,
    };
    company.processPricePerUser(summary);
    console.log(company.getPricePerUserData());
    serverFunctions.setPricePerUser(company.getPricePerUserData());
  };

  const setExpenses = async () => {
    let summary = {
      business_name: 'enu',
      product_name: 'wall-e',
      model_purpose: 'fundraising',
      start_date: '07/2022',
      revenue_model: 'Price per User',
      user_acquisition_cost: 150,
      cost_per_install: 2,
      price_per_user: 5,
      churn_rate: 20,
      organic_growth_rate: 30,
      monthly_operating_expense: 2500,
      monthly_non_operating_expense: 500,
      future_hires: [
        {
          role: 'CEO',
          salary: 200000,
          hire_date: '02/2023',
        },
        {
          role: 'CTO',
          salary: 180000,
          hire_date: '03/2023',
        },
      ],
    };
    let summary1 = {
      hire_plan: [
        ['CEO', '200000', '02/2023'],
        ['CTO', '180000', '03/2023'],
      ],
      operating_expense: 1800,
      non_operating_expense: 500,
    };
    company.processExpenses(summary);
    console.log(company.getExpenses());
    serverFunctions.setExpenses(company.getExpenses());
  };

  const setIncome = async () => {
    let summary = {
      current_cash: 234000,
      expected_investments: [[123000, '06/2023']],
      user_acquisition: {
        monthly_budget: 150,
        cost_per_install: 2,
        price_per_user: 5,
        churn_rate: 0.2,
        organic_growth_rate: 0.3,
      },
      expenses: {
        monthly_operating_expense: 1800,
        monthly_non_operating_expense: 500,
        future_hires: [
          {
            role: 'CEO',
            salary: 200000,
            hire_date: '02/2023',
          },
          {
            role: 'CTO',
            salary: 180000,
            hire_date: '03/2023',
          },
        ],
      },
    };
  };

  return (
    <>
      {/* <h3 className="justify-center items-center text-center text-xl">
        ☀️ Welcome to Enu! ☀️
      </h3> */}
      <p>If there's anything you didn't understand, just ask!</p>
      <div className="flex-grow overflow-y-auto h-full">
        {messages.map((message, index) => (
          <div className="mt-2">
            {message.role == 'assistant' ? (
              <AIMessage key={index} content={message.content} />
            ) : (
              <HumanMessage key={index} content={message.content} />
            )}
            {index == messages.length - 1 && <div ref={messagesEndRef} />}
          </div>
        ))}
        {loading && <Spinner />}
      </div>
      <div className="bg-white p-4 flex-shrink-0 sticky">
        <div className="flex space-x-2 bottom-0">
          <textarea
            value={input}
            disabled={loading == true}
            placeholder="Your message"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === 'Enter' &&
                event.metaKey &&
                input.trim() !== ''
              ) {
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
      {/* <button onClick={setExpenses}>set sales</button> */}
    </>
  );
};

export default Chat;
