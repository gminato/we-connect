import { AppLayout } from '@/components/layout/AppLayout';
import { ContactList } from '@/components/chat/ContactList';
import { useEffect, useState } from 'react';
import { Contact, User } from '@/lib/types';
import { ChatWindow } from '@/components/chat/ChatWindow';

const Chat = () => {
  const [user, setUser] = useState<User>();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({ ...parsedUser, status: 'online' });
      } catch (error) {
        console.error('Error parsing user from local storage', error);
      }
    }
  }, []);

  const handleSelectedContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] grid grid-col-1 md:grid-cols-3 gap-4">
        {/* Contact list */}
        <div className="col-span-1 h-full animate-slide-in">
          <ContactList
            onSelectContact={handleSelectedContact}
            selectedContactId={selectedContact?.id}
          />
        </div>

        {/* Chat screen */}

        {selectedContact && (
          <div className="col-span-2 h-full animate-fade-in">
            <ChatWindow contact={selectedContact} selectedUser={user} />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Chat;
