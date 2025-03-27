import { Contact } from '@/lib/types';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';

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
    contact.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedContacts = filteredContacts.sort((a, b) => {
    if (a.unreadCount != b.unreadCount) {
      return b.unreadCount - a.unreadCount;
    }

    const timeA = a.lastMessage?.timestamp?.getTime() || 0;
    const timeB = b.lastMessage?.timestamp?.getTime() || 0;

    return timeB - timeA;
  });

  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden bg-card">
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
    </div>
  );
}
