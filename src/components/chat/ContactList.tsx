import { Contact } from '@/lib/types';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';
import {cn} from "@/lib/utils";

const mockContacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar:
      'https://ui-avatars.com/api/?name=Alice+Johnson&background=6366F1&color=fff',
    status: 'online',
    unreadCount: 3,
    lastMessage: {
      content: "Hey there! How's it going?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    },
  },
  {
    id: 'contact-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar:
      'https://ui-avatars.com/api/?name=Bob+Smith&background=EC4899&color=fff',
    status: 'offline',
    unreadCount: 0,
    lastMessage: {
      content: "Let me know when you're free",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    },
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 'contact-3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    avatar:
      'https://ui-avatars.com/api/?name=Carol+Williams&background=10B981&color=fff',
    status: 'away',
    unreadCount: 1,
    lastMessage: {
      content: 'Check out this new photo I took!',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
  },
  {
    id: 'contact-4',
    name: 'David Brown',
    email: 'david@example.com',
    avatar:
      'https://ui-avatars.com/api/?name=David+Brown&background=F59E0B&color=fff',
    status: 'online',
    unreadCount: 0,
    lastMessage: {
      content: 'Thanks for your help yesterday!',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
  },
  {
    id: 'contact-5',
    name: 'Eva Garcia',
    email: 'eva@example.com',
    avatar:
      'https://ui-avatars.com/api/?name=Eva+Garcia&background=8B5CF6&color=fff',
    status: 'offline',
    unreadCount: 0,
    lastSeen: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
];

type ContactListProps = {
  onSelectContact: (contact: Contact) => void;
  selectedContactId: string | null;
};

export function ContactList({
  onSelectContact,
  selectedContactId,
}: ContactListProps) {
  const [contacts, setContact] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = [...contacts,...contacts,...contacts].filter((contact: Contact) => {
    return contact.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  console.log(filteredContacts)

  const sortedContacts = filteredContacts.sort((a, b) => {
    if (a.unreadCount != b.unreadCount) {
      return b.unreadCount - a.unreadCount;
    }

    const timeA = a.lastMessage?.timestamp?.getTime() || 0;
    const timeB = b.lastMessage?.timestamp?.getTime() || 0;

    return timeB - timeA;
  });

  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return diffDays === 1 ? "Yesterday" : `${diffDays} days ago`;
    }
    
    if (diffHours > 0) {
      return `${diffHours}h ago`;
    }
    
    if (diffMinutes > 0) {
      return `${diffMinutes}m ago`;
    }
    
    return "Just now";
  }

  return (
    <div className="h-full flex flex-col border rounded-xl overflow-hidden bg-card">
    <div className="p-4 border-b">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="pl-9 bg-muted/50"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-5rem)]">
      {sortedContacts.length === 0 ? (
        <div className="flex items-center justify-center h-full p-4 text-center text-muted-foreground">
          No contacts found
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {sortedContacts.map((contact) => (
            <li key={contact.id}>
              <button
                className={cn(
                  "w-full flex items-center p-4 transition-colors hover:bg-muted/50",
                  selectedContactId === contact.id && "bg-muted"
                )}
                onClick={() => onSelectContact(contact)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  {contact.status === "online" && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background animate-ping-slow" />
                  )}
                  {contact.status === "away" && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-500 ring-2 ring-background" />
                  )}
                </div>
                
                <div className="ml-4 flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{contact.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {contact.lastMessage?.timestamp ? (
                        getTimeAgo(contact.lastMessage.timestamp)
                      ) : contact.lastSeen ? (
                        `Seen ${getTimeAgo(contact.lastSeen)}`
                      ) : null}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm truncate text-muted-foreground max-w-[180px]">
                      {contact.lastMessage?.content || "No messages yet"}
                    </p>
                    {contact.unreadCount > 0 && (
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-semibold">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  );
}
