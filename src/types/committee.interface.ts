export interface CommitteeMember {
  id: number;
  name: string;
  affiliation: string;
  email: string;
  note: string;
  pivot: {
    cId: number;
    id2: number;
    email: string;
    note: string;
  };
}

export interface CommitteeData {
  id: number;
  name: string;
  explanation: string;
  members: CommitteeMember[];
}
