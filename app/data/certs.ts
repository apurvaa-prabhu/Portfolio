export type Cert = {
  issuer: string;
  title: string;
  issued?: string;
  code: string;
  credentialUrl: string;
};

export const certs: Cert[] = [
  {
    issuer: "Google Cloud",
    title: "Generative AI Leader",
    code: "TH4BU5NKXDNC",
    credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/TH4BU5NKXDNC",
  },
  {
    issuer: "JPMorganChase · Forage",
    title: "Software Engineering Job Simulation",
    code: "ZmjAcS5KhbNkH83xx",
    credentialUrl: "https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_fZmcBFbxMD6PnZ7pn_1774318023309_completion_certificate.pdf",
  },
  {
    issuer: "Microsoft",
    title: "Introduction to Web Development",
    code: "7Y5P717K4ALB",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/7Y5P717K4ALB",
  },
  {
    issuer: "Microsoft",
    title: "Foundations of Coding Full-Stack",
    code: "8FW2I6VGVGEZ",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/8FW2I6VGVGEZ",
  },
];
