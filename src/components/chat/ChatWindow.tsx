import { useEffect, useRef, useState } from 'react';
import { Contact, User, Message } from '@/lib/types';
import { cn } from '@/lib/utils';

type ChatWindowProp = {
  contact: Contact;
  selectedUser: User;
};

const mockMessages: Record<string, Message[]> = {
  'contact-1': [
    {
      id: 'msg-1',
      senderId: 'contact-1',
      recipientId: 'user-1',
      content: "Hey there! How's it going?",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg-2',
      senderId: 'user-1',
      recipientId: 'contact-1',
      content: "Hi Alice! I'm doing well, thanks for asking. How about you?",
      timestamp: new Date(Date.now() - 14 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg-3',
      senderId: 'contact-1',
      recipientId: 'user-1',
      content: "I'm great! Just finished working on a new project.",
      timestamp: new Date(Date.now() - 13 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg-4',
      senderId: 'contact-1',
      recipientId: 'user-1',
      content: "Would love to catch up sometime this week if you're free?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
    },
    {
      id: 'msg-5',
      senderId: 'contact-1',
      recipientId: 'user-1',
      content: 'I found this really cool cafe we could check out 😊',
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
      read: false,
    },
    {
      id: 'msg-6',
      senderId: 'contact-1',
      recipientId: 'user-1',
      content: 'Let me know what you think!',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      read: false,
    },
  ],
  'contact-2': [
    {
      id: 'msg-7',
      senderId: 'user-1',
      recipientId: 'contact-2',
      content: 'Hey Bob, did you get a chance to look at those files?',
      timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg-8',
      senderId: 'contact-2',
      recipientId: 'user-1',
      content: 'Yes, I did. Everything looks good!',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg-9',
      senderId: 'contact-2',
      recipientId: 'user-1',
      content: "Let me know when you're free to discuss the next steps.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: true,
    },
  ],
  'contact-3': [
    {
      id: 'msg-10',
      senderId: 'contact-3',
      recipientId: 'user-1',
      content: 'Check out this new photo I took!',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: false,
    },
  ],
  'contact-4': [
    {
      id: 'msg-11',
      senderId: 'contact-4',
      recipientId: 'user-1',
      content: 'Thanks for your help yesterday! I really appreciate it.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: 'msg-12',
      senderId: 'user-1',
      recipientId: 'contact-4',
      content: 'No problem at all! Happy to help anytime.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
    },
  ],
};

export function ChatWindow({ contact, selectedUser }: ChatWindowProp) {
  const [message, setMessage] = useState<Message[]>();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessage(mockMessages[contact.id] || []);

    if (mockMessages[contact.id]) {
      mockMessages[contact.id] = mockMessages[contact.id].map((msg) => ({
        ...msg,
        read: true,
      }));
    }

    // scroll to bottom

    const timeout = setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    () => {
      // remove all timeout
      clearTimeout(timeout);
    };
  }, [contact.id]);

  return (
    <div className="w-full flex flex-col border rounded-xl bg-card ">
      {/* Message Header */}
      <div className="p-4 flex items-center border-b">
        <div className="relative">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="ml-3">
          <h3 className="font-medium">{contact.name}</h3>
          <div className="text-xs text-muted-foreground">
            {contact.status[0].toUpperCase() + contact.status.substring(1)}
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message?.length === 0 || !message ? (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            No messages found
          </div>
        ) : (
          message?.map((message) => {
            const isCurrentUser = message.senderId !== selectedUser?.id;

            return (
              <div
                key={message.id}
                className={`flex ${
                  isCurrentUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="flex items-end space-x-2">
                  {!isCurrentUser && (
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )}

                  <div
                    className={cn(
                      'max-w-md px-4 py-2 rounded-2xl',
                      isCurrentUser
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-muted-foreground rounded-bl-none'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div
                      className={cn(
                        'text-xs mt-1 flex items-center space-x-1',
                        isCurrentUser
                          ? 'text-primary-foreground/80'
                          : 'text-muted-foreground/80'
                      )}
                    >
                      <span>{formatMessageTime(message.timestamp)}</span>
                      {isCurrentUser && (
                        <span>{message.read ? '✓✓' : '✓'}</span>
                      )}
                    </div>
                  </div>

                  {isCurrentUser && (
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return diffDays === 1 ? 'yesterday' : `${diffDays} days ago`;
  }

  if (diffHours > 0) {
    return `${diffHours}h ago`;
  }

  if (diffMinutes > 0) {
    return `${diffMinutes}m ago`;
  }

  return 'just now';
}

function formatMessageTime(date: Date): string {
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) {
    return `Yesterday, ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  }

  return date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
