export type Portfolio = {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  studentPhoto: string; // URL ของรูปนักเรียน
  activityPhotos: string[]; // array ของ URL รูปกิจกรรม
  educationLevel: string;
  school: string;
  gpa: number;
  talent?: string;
  reason?: string;
  major: string;
  faculty: string;
  university: string;
};
