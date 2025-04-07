import React, { useState } from 'react';
import styles from './Chatbox.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: 'Xin chào, tôi có thể giúp gì cho bạn ?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const newMsg = {
            id: messages.length + 1,
            sender: 'user',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');

        // Thêm tin nhắn typing indicator trước
        const typingMsg = {
            id: messages.length + 2,
            sender: 'bot',
            isTyping: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prevMessages) => [...prevMessages, typingMsg]);

        // Sau 2 giây, thay thế tin nhắn typing bằng tin nhắn thực
        setTimeout(() => {
            const botReply = {
                id: messages.length + 2,
                sender: 'bot',
                text: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm!',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            // Thay thế tin nhắn typing bằng tin nhắn thực
            setMessages((prevMessages) => prevMessages.map((msg) => (msg.isTyping ? botReply : msg)));
        }, 2000);
    };

    // Nếu chatbox đóng, chỉ hiển thị nút toggle
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
                                    }}
                                >
                                    {message.isTyping ? (
                                        <div className={cx('typingIndicator')}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    ) : (
                                        message.text
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
                            />
                            <button type="button" className={cx('attachmentButton')}>
                                <img src="/images/open-file.svg" alt="" />
                            </button>
                            <button type="submit" className={cx('sendButton')}>
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
