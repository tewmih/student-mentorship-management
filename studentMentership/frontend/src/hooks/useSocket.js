import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.warn('No authentication token found');
      return;
    }

    // Initialize socket connection
    socketRef.current = io('http://localhost:3000', {
      auth: {
        token: token
      }
    });

    const socket = socketRef.current;

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return socketRef.current;
};

export const useSocketNotifications = (onNewNotification, onUnreadCountUpdate) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Listen for new notifications
    socket.on('newNotification', (notification) => {
      console.log('New notification received:', notification);
      if (onNewNotification) {
        onNewNotification(notification);
      }
    });

    // Listen for unread count updates
    socket.on('unreadCount', (count) => {
      console.log('Unread count updated:', count);
      if (onUnreadCountUpdate) {
        onUnreadCountUpdate(count);
      }
    });

    // Request initial unread count
    socket.emit('getUnreadCount');

    return () => {
      socket.off('newNotification');
      socket.off('unreadCount');
    };
  }, [socket, onNewNotification, onUnreadCountUpdate]);

  const markNotificationRead = (notificationId) => {
    if (socket) {
      socket.emit('markNotificationRead', { notificationId });
    }
  };

  return {
    socket,
    markNotificationRead
  };
};
