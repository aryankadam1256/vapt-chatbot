import { useState } from 'react';

export default function ChatInput({ onSend, loading, fullWidth = false, placeholder = 'Type your message...' }) {
  const [input, setInput] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (input.trim() === '' || loading) return;
    onSend(input);
    setInput('');
  };

  return (
    <form
      onSubmit={submit}
      className={
        fullWidth
          ? 'w-full max-w-2xl mx-auto flex items-center space-x-3'
          : 'flex items-center space-x-3'
      }
    >
      <input
        type="text"
        className={
          (fullWidth ? 'w-full ' : 'flex-grow ') +
          'border-2 border-purple-300 rounded-full px-6 py-4 text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition shadow-sm bg-white'
        }
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg transform hover:scale-105"
        disabled={loading}
        aria-label="Send message"
      >
        {loading ? '⏳' : '🚀'}
      </button>
    </form>
  );
}
