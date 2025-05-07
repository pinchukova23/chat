export type InputValue = {
    name: string;
    room: string;
  };

export type MessageData = {
    content: string;
  };

export type SearchParams = {
    name: string;
    room: string;
  }

export type MessageProps = {
    messages: MessageData[];
    name: string;
}