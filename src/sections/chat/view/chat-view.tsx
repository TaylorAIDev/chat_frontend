import { useEffect, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSearchParams } from 'src/routes/hooks';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// api
import { useGetConversation } from 'src/api/chat';
// components
import { useSettingsContext } from 'src/components/settings';
// types
import { IChatParticipant, IChatConversations } from 'src/types/chat';
//
import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';
import ChatMessageList from '../chat-message-list';

// ----------------------------------------------------------------------

export default function ChatView() {

  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const searchParams = useSearchParams();

  const selectedConversationId = searchParams.get('id') || '';

  const { conversation } = useGetConversation(`${selectedConversationId}`);

  const participants: IChatParticipant[] = conversation
    ? conversation.participants.filter(
        (participant: IChatParticipant) => participant.id !== `${user?.id}`
      )
    : [];

  const [fetchContacts, setFetchContacts] = useState<IChatParticipant[]>()
  const [fetchConversations, setFetchConversations] = useState<IChatConversations>()

  const details = !!conversation;


  useEffect(() => {
    const sendData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_HOST_API}/api/allData`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const {contacts1, conversations1} = jsonData
        setFetchContacts(contacts1)
        setFetchConversations(conversations1)
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };
    sendData();
  }, []);

  const renderNav = (
    <ChatNav
      contacts={fetchContacts as IChatParticipant[]}
      conversations={fetchConversations as IChatConversations}
      loading={false}
      selectedConversationId={selectedConversationId}
    />
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList messages={conversation?.messages} participants={participants} />
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Chat
      </Typography>

      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {/* {renderHead} */}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}

            {details && <ChatRoom conversation={conversation} participants={participants} />}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
