export interface Ticket {
  id: String;
  title: string;
  request: string;
  status: 'open' | 'closed';
}
