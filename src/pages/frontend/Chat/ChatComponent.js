import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;

const ChatComponent = () => {
    const [userData, setUserData] = useState({
        username: '',
        connected: false,
        message: '',
        chatRoomId: null,
    });

    useEffect(() => {
        connect();
    }, []);

    const connect = () => {
        const socket = new SockJS('http://localhost:9011/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe('/user/queue/messages', onMessageReceived);
        if (userData.chatRoomId) {
            stompClient.subscribe('/topic/room/' + userData.chatRoomId, onMessageReceived);
        }
    };

    const onError = (err) => {
        console.error(err);
    };

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        console.log(message);
    };

    const sendMessage = () => {
        if (stompClient && stompClient.connected && userData.message && userData.chatRoomId) {
            const chatMessage = {
                sender: userData.username, // Sử dụng userData.username thay vì chuỗi cứng
                content: userData.message,
                receiver: { id: 87 }, // ID của người nhận
                chatRoom: { id: userData.chatRoomId }, // ID của phòng chat
            };
            stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: '' });
        } else {
            console.error('STOMP client is not connected or missing necessary data');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                placeholder="Nhập tên người dùng"
            />
            <br />
            <input
                type="text"
                value={userData.chatRoomId || ''}
                onChange={(e) => setUserData({ ...userData, chatRoomId: e.target.value })}
                placeholder="Nhập ID phòng chat"
            />
            <br />
            <textarea
                value={userData.message}
                onChange={(e) => setUserData({ ...userData, message: e.target.value })}
                placeholder="Nhập tin nhắn"
            ></textarea>
            <br />
            <button onClick={sendMessage}>Gửi</button>
        </div>
    );
};

export default ChatComponent;
