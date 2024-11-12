const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addData = async () => {
  const data = [
    {
      "department": "Engineering",
      "career": "Software Engineer",
      "number": 3,
      "available": true,
      "jobDescription": "Develop and maintain web applications.",
      "salaryRange": "$80,000 - $120,000",
      "skillsRequired": "JavaScript, React, Node.js, SQL",
      "location": "New York, NY",
      "createdAt": "2024-01-01T12:00:00Z",
      "updatedAt": "2024-01-01T12:00:00Z"
    },
    {
      "department": "Engineering",
      "career": "Backend Developer",
      "number": 2,
      "available": true,
      "jobDescription": "Build and manage APIs and services.",
      "salaryRange": "$70,000 - $110,000",
      "skillsRequired": "Node.js, Python, MongoDB, Docker",
      "location": "San Francisco, CA",
      "createdAt": "2024-01-02T12:00:00Z",
      "updatedAt": "2024-01-02T12:00:00Z"
    },
    {
      "department": "Engineering",
      "career": "Frontend Developer",
      "number": 4,
      "available": true,
      "jobDescription": "Design and implement user interfaces.",
      "salaryRange": "$60,000 - $100,000",
      "skillsRequired": "HTML, CSS, JavaScript, React",
      "location": "Austin, TX",
      "createdAt": "2024-01-03T12:00:00Z",
      "updatedAt": "2024-01-03T12:00:00Z"
    },
    {
      "department": "Marketing",
      "career": "SEO Specialist",
      "number": 1,
      "available": true,
      "jobDescription": "Optimize websites for search engines.",
      "salaryRange": "$50,000 - $80,000",
      "skillsRequired": "SEO, Google Analytics, Content Marketing",
      "location": "Chicago, IL",
      "createdAt": "2024-01-04T12:00:00Z",
      "updatedAt": "2024-01-04T12:00:00Z"
    },
    {
      "department": "Marketing",
      "career": "Social Media Manager",
      "number": 2,
      "available": true,
      "jobDescription": "Manage social media presence and campaigns.",
      "salaryRange": "$45,000 - $75,000",
      "skillsRequired": "Social Media, Content Creation, Analytics",
      "location": "Los Angeles, CA",
      "createdAt": "2024-01-05T12:00:00Z",
      "updatedAt": "2024-01-05T12:00:00Z"
    },
    {
      "department": "Design",
      "career": "UX Designer",
      "number": 2,
      "available": true,
      "jobDescription": "Design user-friendly interfaces for apps.",
      "salaryRange": "$65,000 - $100,000",
      "skillsRequired": "UX Design, Wireframing, Figma, Adobe XD",
      "location": "San Diego, CA",
      "createdAt": "2024-01-06T12:00:00Z",
      "updatedAt": "2024-01-06T12:00:00Z"
    },
    {
      "department": "Design",
      "career": "Graphic Designer",
      "number": 3,
      "available": true,
      "jobDescription": "Create visuals for print and digital media.",
      "salaryRange": "$50,000 - $85,000",
      "skillsRequired": "Illustrator, Photoshop, Branding",
      "location": "Portland, OR",
      "createdAt": "2024-01-07T12:00:00Z",
      "updatedAt": "2024-01-07T12:00:00Z"
    },
    {
      "department": "Product",
      "career": "Product Manager",
      "number": 2,
      "available": true,
      "jobDescription": "Lead product development from concept to launch.",
      "salaryRange": "$95,000 - $140,000",
      "skillsRequired": "Product Strategy, Agile, Market Research",
      "location": "Seattle, WA",
      "createdAt": "2024-01-08T12:00:00Z",
      "updatedAt": "2024-01-08T12:00:00Z"
    },
    {
      "department": "Sales",
      "career": "Sales Representative",
      "number": 5,
      "available": true,
      "jobDescription": "Sell products and services to customers.",
      "salaryRange": "$40,000 - $60,000",
      "skillsRequired": "Communication, Negotiation, CRM",
      "location": "Miami, FL",
      "createdAt": "2024-01-09T12:00:00Z",
      "updatedAt": "2024-01-09T12:00:00Z"
    },
    {
      "department": "Sales",
      "career": "Account Executive",
      "number": 3,
      "available": true,
      "jobDescription": "Manage accounts and relationships with clients.",
      "salaryRange": "$50,000 - $90,000",
      "skillsRequired": "Salesforce, Client Management, Negotiation",
      "location": "Boston, MA",
      "createdAt": "2024-01-10T12:00:00Z",
      "updatedAt": "2024-01-10T12:00:00Z"
    },
    {
      "department": "Operations",
      "career": "Operations Manager",
      "number": 2,
      "available": true,
      "jobDescription": "Oversee day-to-day operations and efficiency.",
      "salaryRange": "$70,000 - $120,000",
      "skillsRequired": "Project Management, Logistics, Process Optimization",
      "location": "Dallas, TX",
      "createdAt": "2024-01-11T12:00:00Z",
      "updatedAt": "2024-01-11T12:00:00Z"
    },
    {
      "department": "Operations",
      "career": "Logistics Coordinator",
      "number": 4,
      "available": true,
      "jobDescription": "Coordinate and optimize supply chain operations.",
      "salaryRange": "$45,000 - $70,000",
      "skillsRequired": "Logistics, Supply Chain Management, Excel",
      "location": "Atlanta, GA",
      "createdAt": "2024-01-12T12:00:00Z",
      "updatedAt": "2024-01-12T12:00:00Z"
    },
    {
      "department": "HR",
      "career": "Human Resources Specialist",
      "number": 3,
      "available": true,
      "jobDescription": "Manage employee relations and company policies.",
      "salaryRange": "$50,000 - $75,000",
      "skillsRequired": "Employee Relations, HRIS, Recruiting",
      "location": "Denver, CO",
      "createdAt": "2024-01-13T12:00:00Z",
      "updatedAt": "2024-01-13T12:00:00Z"
    },
    {
      "department": "HR",
      "career": "Recruiter",
      "number": 4,
      "available": true,
      "jobDescription": "Source and hire candidates for open positions.",
      "salaryRange": "$40,000 - $65,000",
      "skillsRequired": "Talent Sourcing, Interviewing, Applicant Tracking Systems",
      "location": "Phoenix, AZ",
      "createdAt": "2024-01-14T12:00:00Z",
      "updatedAt": "2024-01-14T12:00:00Z"
    },
    {
      "department": "Finance",
      "career": "Financial Analyst",
      "number": 3,
      "available": true,
      "jobDescription": "Analyze financial data and provide insights.",
      "salaryRange": "$60,000 - $90,000",
      "skillsRequired": "Excel, Financial Modeling, Reporting",
      "location": "Charlotte, NC",
      "createdAt": "2024-01-15T12:00:00Z",
      "updatedAt": "2024-01-15T12:00:00Z"
    },
    {
      "department": "Finance",
      "career": "Accountant",
      "number": 4,
      "available": true,
      "jobDescription": "Manage financial records and transactions.",
      "salaryRange": "$55,000 - $80,000",
      "skillsRequired": "Accounting Software, Tax Preparation, Financial Reporting",
      "location": "Orlando, FL",
      "createdAt": "2024-01-16T12:00:00Z",
      "updatedAt": "2024-01-16T12:00:00Z"
    }
  ];

  try {
    const res = await prisma.career.createMany({ data });
    console.log({
      res,
      'data': data
    });
  } catch (err) {
    console.error("Error inserting data:", err.stack || err);
  }
};

addData();