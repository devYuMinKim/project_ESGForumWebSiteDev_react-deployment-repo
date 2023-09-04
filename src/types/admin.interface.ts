export interface CommitteeData {
  id: number,
  name: string,
  explanation: string,
}

export interface committeeMember {
  id: number; // 위원회에서의 순번
  m_id: number;
  name: string;
  affiliation: string;
  pivot: {
    id2: number; // 회원의 순번
    note: string | null; // 위원회에서의 직책
  }
  note?: number | null; // 특정 위원회의 직위 | 회원 만의 직위
}

export interface Member {
  id: number
  name: string;
  affiliation: string;
  note?: number | null | string; // esg 포럼에서의 직위
}

export interface StatisticsCardData {
  name: string
  color: string,
  icon: any,
  title: string,
  value?: string | number
}

export interface User {
  email: string,
  affiliation: string,
  name: string,
  authority: null | number
}

export interface UserDataResponse {
  users: User[],
  applicants: User[],
}