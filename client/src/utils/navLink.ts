type NavLinks = {
  name: string;
  icon: "course" | "community" | "about" | "exam";
  href: string;
};
export const navLinks: NavLinks[] = [
  {
    name: "Giáo trình HSK",
    icon: "course",
    href: "/courses",
  },
  {
    name: "Khóa học",
    icon: "community",
    href: "/mincourses",
  },
  {
    name: "Từ Vựng",
    icon: "exam",
    href: "/vocabulary",
  },
  {
    name: "Đề thi HSK",
    icon: "about",
    href: "/examination",
  },
  // {
  //   name: "Luyện tập",
  //   icon: "about",
  //   href: "/practice",
  // },
];

export const socialLinks = {
  email: "address@yoursite.com",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  linkedin: "https://linkedin.com",
  twitter: "",
  threads: "",
  instagram: "",
};
