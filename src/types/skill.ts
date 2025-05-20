// Full Skill type (from DB)
export type TSkill = {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Form input type (only what user inputs)
export type TSkillInput = {
  name: string;
  image: string;
};
