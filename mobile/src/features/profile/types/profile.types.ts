export type ProfilePayload = {
  currentTitle: string;
  yearsExperience?: number;
  coreSkills: string[];
  industries: string[];
  targetRoles: string[];
  summary: string;
  remotePreference?: string;
};

export type Profile = Omit<
  ProfilePayload,
  'yearsExperience' | 'remotePreference'
> & {
  id: string;
  userId: string;
  yearsExperience: number | null;
  remotePreference: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProfileResponse = {
  profile: Profile;
};
