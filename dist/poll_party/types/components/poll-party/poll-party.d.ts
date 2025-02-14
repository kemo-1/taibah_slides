import PartySocket from "partysocket";
type Poll = {
  question: string;
  options: {
    [key: string]: string;
  };
};
type Votes = {
  [key: string]: number;
};
export declare class PollParty {
  hostEl: HTMLDivElement;
  host: string;
  party: string | null;
  room: string;
  poll: Poll;
  votes: Votes;
  socket: PartySocket;
  selectedOption: string | null;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): Promise<void>;
  submitVote(e: any): Promise<void>;
  resetPoll(): Promise<void>;
  render(): any;
}
export {};
