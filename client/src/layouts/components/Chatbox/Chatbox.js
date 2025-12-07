import React, { useState, useEffect } from 'react';
import styles from './Chatbox.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(() => {
        // Load messages from localStorage on mount
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages
            ? JSON.parse(savedMessages)
            : [
                  {
                      id: 1,
                      sender: 'bot',
                      text: 'Xin chào, tôi là trợ lý AI. Tôi có thể giúp gì cho bạn hôm nay?',
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
              ];
    });
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };

    const fetchWithTimeout = async (url, options, timeout = 180000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    };

    const fetchBotResponse = async (userMessage) => {
        try {
            const response = await fetchWithTimeout(
                'http://127.0.0.1:1234/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'gemma-3-1b-it',
                        messages: [
                            { role: 'system', content: 'Bạn là một trợ lý AI hữu ích, trả lời ngắn gọn và chính xác.' },
                            { role: 'user', content: userMessage },
                        ],
                        temperature: 0.7,
                        max_tokens: 300,
                        stream: false,
                    }),
                },
                180000, // Fixed timeout to 180s to match Assignment.jsx
            );

            if (!response.ok) {
                throw new Error(`Không thể kết nối đến LM Studio. Status: ${response.status}`);
            }

            const data = await response.json();
            let botReply = data.choices[0].message.content;

            // Clean up bot reply (remove unwanted formatting like ```json)
            botReply = botReply.replace(/^```json\n|\n```$/g, '').trim();

            return botReply;
        } catch (error) {
            console.error('Lỗi khi gọi LM Studio:', error);
            return 'Xin lỗi, tôi không thể trả lời ngay bây giờ. Vui lòng thử lại sau!';
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || isSending) return;

        setIsSending(true);

        const newMsg = {
            id: messages.length + 1,
            sender: 'user',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');

        const typingMsg = {
            id: messages.length + 2,
            sender: 'bot',
            isTyping: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prevMessages) => [...prevMessages, typingMsg]);

        const botReplyText = await fetchBotResponse(newMessage);

        const botReply = {
            id: messages.length + 2,
            sender: 'bot',
            text: botReplyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prevMessages) => prevMessages.map((msg) => (msg.isTyping ? botReply : msg)));
        setIsSending(false);
    };

    // Optional: Clear chat history
    const handleClearChat = () => {
        const initialMessage = [
            {
                id: 1,
                sender: 'bot',
                text: 'Xin chào, tôi là trợ lý AI. Tôi có thể giúp gì cho bạn hôm nay?',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        ];
        setMessages(initialMessage);
        localStorage.setItem('chatMessages', JSON.stringify(initialMessage));
    };

    if (!isOpen) {
        return (
            <div className={styles.chatToggle} onClick={toggleChatbox}>
                <div className={styles.chatIcon}>
                    <img src="/images/chat-icon.svg" alt="HUIT" />
                    <span>Chat trực tuyến</span>
                </div>
            </div>
        );
    }

    return (
        <div className={cx('chatWrapper')}>
            <div className={cx('chatContainer')}>
                {/* Header */}
                <div className={cx('chatHeader')}>
                    <div className={cx('chatHeaderLeft')}>
                        <div className={cx('chatAvatar')}>
                            <img src="/images/logo-huit.png" alt="" />
                        </div>
                        <img
                            src="/images/ActiveStatusIcon.svg"
                            alt=""
                            style={{ position: 'relative', top: '13px', left: '-22px', width: '15px', height: '15px' }}
                        />
                        <div className={cx('chatTitle')}>
                            <div>Trò chuyện với</div>
                            <div className={cx('chatName')}>HUIT E-LEARN</div>
                        </div>
                    </div>
                    <button className={cx('closeButton')} onClick={toggleChatbox}>
                        ✕
                    </button>
                </div>

                {/* Chat Messages */}
                <div className={cx('chatMessages')}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${cx('messageContainer')} ${
                                message.sender === 'user' ? cx('userMessage') : cx('botMessage')
                            }`}
                        >
                            {message.sender === 'bot' && (
                                <div className={cx('botAvatar')}>
                                    <img src="/images/logo-huit.png" alt="HUIT" />
                                </div>
                            )}

                            <div className={cx('messageContentWrapper')}>
                                {message.time && <div className={cx('messageTime')}>{message.time}</div>}
                                <div
                                    className={`${cx('messageBubble')} ${
                                        message.sender === 'user' ? cx('userBubble') : cx('botBubble')
                                    }`}
                                    style={{
                                        background:
                                            message.sender === 'user'
                                                ? 'linear-gradient(to right, #0000fd, #00008b)'
                                                : '#F1F4F8',
                                        whiteSpace: 'pre-wrap', // Respect newlines
                                    }}
                                >
                                    {message.isTyping ? (
                                        <div className={cx('typingIndicator')}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    ) : (
                                        // Split text by \n and join with <br />
                                        message.text.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                {index < message.text.split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className={cx('chatInputContainer')}>
                    <form onSubmit={handleSendMessage}>
                        <div className={cx('inputWrapper')}>
                            <button type="button" className={cx('emojiButton')}>
                                <img src="/images/Group.svg" alt="" />
                            </button>
                            <input
                                type="text"
                                placeholder="Nhập tin nhắn"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                disabled={isSending}
                            />
                            <button type="button" className={cx('attachmentButton')}>
                                <img src="/images/open-file.svg" alt="" />
                            </button>
                            <button type="submit" className={cx('sendButton')} disabled={isSending}>
                                <img src="/images/send-icon.svg" alt="" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
