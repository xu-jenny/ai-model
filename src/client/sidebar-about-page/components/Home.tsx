import React from 'react';
import { useState } from 'react';
import Chat from './Chat';
import { Company } from './Company';
import Sales from './Sales';
import CompanyContext from './CompanyContext';

const Home = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const company = new Company();

  return (
    <CompanyContext.Provider value={{ company }}>
      <div className="tab-menu">
        {/* <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" href="#" onClick={() => setActiveTab("chat")}>
                        Chat
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => setActiveTab("explore")}>
                        Explore
                    </a>
                </li>
            </ul> */}
        <ul className="flex border-b">
          <li className="-mb-px mr-1">
            <a
              className={
                'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold ' +
                (activeTab === 'chat' ? 'border-b-0' : 'border-b')
              }
              href="#"
              onClick={() => setActiveTab('chat')}
            >
              Chat
            </a>
          </li>
          <li className="mr-1">
            <a
              className={
                'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ' +
                (activeTab === 'explore' ? 'border-b-0' : 'border-b')
              }
              href="#"
              onClick={() => setActiveTab('explore')}
            >
              Explore
            </a>
          </li>
        </ul>
        <div className="tab-content" style={{ height: 'calc(100vh - 170px)' }}>
          {activeTab == 'chat' && <Chat />}
          {activeTab == 'explore' && <Sales />}
        </div>
      </div>
    </CompanyContext.Provider>
  );
};

export default Home;
