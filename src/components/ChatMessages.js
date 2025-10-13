import ReactMarkdown from 'react-markdown';

export default function ChatMessages({ messages }) {
  return (
    <>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
        >
          <div
            className={`max-w-[75%] rounded-3xl px-5 py-4 shadow-lg ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                : 'bg-white text-gray-800 border-2 border-gray-200'
            }`}
          >
            {msg.role === 'user' ? (
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            ) : (
              <div className="prose prose-sm max-w-none text-gray-800">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc ml-5 mb-3 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal ml-5 mb-3 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    strong: ({ children }) => <strong className="font-bold text-purple-700">{children}</strong>,
                    em: ({ children }) => <em className="italic text-pink-600">{children}</em>,
                    code: ({ inline, children }) =>
                      inline ? (
                        <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">{children}</code>
                      ) : (
                        <code className="block bg-gray-100 p-3 rounded-lg text-xs overflow-x-auto font-mono border border-gray-300">{children}</code>
                      ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
