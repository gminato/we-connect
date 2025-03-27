import { AppLayout } from '@/components/layout/AppLayout';
import { ContactList } from '@/components/chat/ContactList'

const Chat = () => {
  return (
    <AppLayout>
      <div className='h-[calc(100vh-4rem)] grid grid-col-1 md:grid-cols-3 gap-4'>
        {/* Contact list */}
        <div className="col-span-1 h-full animate-slide-in">
         <ContactList 
            onSelectContact={() => {}}
            selectedContactId={null}
          /> 
        </div>
      </div> 
    </AppLayout>
  );
};

export default Chat;
