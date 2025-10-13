import { useState, useRef, useEffect } from 'react';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSend(message) {
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      
      if (data.error) {
        setMessages([...newMessages, { role: 'assistant', content: 'Sorry, an error occurred. Please try again.' }]);
      } else {
        setMessages([...newMessages, data]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Network error. Please check your connection.' }]);
    }
    
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl h-[90vh] flex flex-col bg-white/95 backdrop-blur rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-5 shadow-lg">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">🤖</span>
            <span>VAPT Chatbot</span>
          </h1>
          <p className="text-sm mt-1 text-purple-100">Powered by VAPT ✨</p>
        </div>

        <div className="flex-grow overflow-y-auto p-6 bg-gray-50 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-3xl font-semibold text-gray-800">Ask anything</h2>
              <p className="text-gray-500 mt-2 mb-6">Get instant answers, ideas, and help.</p>
              <ChatInput onSend={handleSend} loading={loading} fullWidth placeholder="Ask your AI..." />
            </div>
          ) : (
            <>
              <ChatMessages messages={messages} />
              <div ref={messagesEndRef} />
            </>
          )}

          {loading && messages.length > 0 && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl px-6 py-4 shadow-md">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length > 0 && (
          <div className="border-t border-gray-200 p-5 bg-white">
            <ChatInput onSend={handleSend} loading={loading} placeholder="Type your message..." />
          </div>
        )}
      </div>
    </div>
  );
}
