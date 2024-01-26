// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// types
import { IChatParticipant, IChatMessage } from 'src/types/chat';
//
import { useGetMessage } from './hooks';

// ----------------------------------------------------------------------

type Props = {
  message: IChatMessage;
  participants: IChatParticipant[];
  onOpenLightbox: (value: string) => void;
};

export default function ChatMessageItem({ message, participants, onOpenLightbox }: Props) {
  const { user } = useMockedUser();

  const { me, senderDetails, hasImage } = useGetMessage({
    message,
    participants,
    currentUserId: `${user?.id}`,
  });

  const { firstName, avatarUrl } = senderDetails;

  const { body } = message;

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...(!me && {
          mr: 'auto',
        }),
      }}
    >
      {!me && `${firstName}`} &nbsp;
    </Typography>
  );

  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        typography: 'body2',
        bgcolor: 'background.neutral',
        ...(message.senderId === "Ai-BOT" && {
          color: 'grey.800',
          bgcolor: 'primary.lighter',
        }),
        
      }}
    >
      {hasImage ? (
        <Box
          component="img"
          alt="attachment"
          src={body}
          onClick={() => onOpenLightbox(body)}
          sx={{
            minHeight: 220,
            borderRadius: 1.5,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        />
      ) : (
        body
      )}
    </Stack>
  );

  return (
    <Stack direction="row" justifyContent={message.senderId === "Ai-BOT" ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>
      {!me && <Avatar alt={firstName} src={avatarUrl} sx={{ width: 32, height: 32, mr: 2 }} />}

      <Stack alignItems="flex-end">
        {renderInfo}

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: 'relative',
            '&:hover': {
              '& .message-actions': {
                opacity: 1,
              },
            },
          }}
        >
          {renderBody}
        </Stack>
      </Stack>
    </Stack>
  );
}
