import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = ({ messages, setMessages }) => {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendMessage(message);
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessages(messages);
    }
  };

  return (
    <form className="px-4 py-2 bg-gray-800 border-t border-gray-700" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 text-sm px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all duration-200 flex items-center justify-center w-10 h-10"
        >
          {loading ? (
            <div className="loading loading-spinner loading-sm text-white"></div>
          ) : (
            <BsSend className="text-lg" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
