export interface Plan {
  name: string;
  duration: {
    formatted: string;
    timer: number;
  };
}
export interface User {
  uuid: string;
  id: string;
  tag: string;
  email: string;
  plan: Plan;
  blockList: boolean;
  thread: string;

  createdAt: Date;
  updatedAt: Date;
}
