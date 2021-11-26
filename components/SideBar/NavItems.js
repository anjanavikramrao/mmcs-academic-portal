export const Basicstructure = [
 /*  {
    icon: "lnr-apartment",
    label: "Playground",
    to: "/Playground/Formexecutiveform",
  }, */
  {
    "id": 2,
    "parentId": 1,
    icon: "pe-7s-id",
    label: "Education Group",
    to: "/EducationGroup/Educationgrouplist",
  },
  {
    "id": 3,
    "parentId": 1,
    icon: "lnr-apartment",
    label: "University",
    to: "/University/Universitylist",
  },
  {
    "id": 4,
    "parentId": 1,
    icon: "pe-7s-culture",
    label: "Institution Group",
    to: "/InstitutionGroup/InstitutionGrouplist",
  },
  {
    "id": 5,
    "parentId": 1,
    icon: "lnr-apartment",
    label: "Campus Institute/School",
    to: "/Institution/Institutelist",
  },
  {
    "id": 6,
    "parentId": 1,
    icon: "lnr-store",
    label: "Department",
    to: "/Department/Departmentlist",
  },
 
];

export const academiccalendar = [
    {
     icon: "pe-7s-study",
     label: "Academic Calendar",
     to: "/AcademicCalendar/Academiccalendarlist",
   }, 
   {
     icon: "pe-7s-study",
     label: "Admission Calendar",
     to: "/AdmissionCalendar/Admissioncalendarlist",
   }, 
    {
    icon: "pe-7s-study",
    label: "Calendar Reviewer",
    to: "/AcademicCalendar/CalendarReviewer",
  }, 
  ]
export const academics = [
  /*  {
     icon: "pe-7s-study",
     label: "Program Level/Category",
     to: "/Programlevel/Programlevellist",
   }, */
   {
     icon: "pe-7s-notebook",
     label: "Program",
      to: "/Program/Programlist",
   },
   {
    "id": 1,
    icon: "pe-7s-notebook",
    "label": "Academic Structure"
  },
   {
    "id": 2,
    "parentId": 1,
    icon: "pe-7s-notebook",
    label: "Program Group",
     to: "/Program/Programgrouplist",
  },
  {
    "id": 3,
    "parentId": 1,
    icon: "pe-7s-study",
    label: "Program",
    //  to: "/Program/Programlist",
  },
  {
    "id": 4,
    "parentId": 1,
    icon: "pe-7s-study",
    label: "Qualification",
     to: "/Program/Qualification",
  },
  {
    "id": 5,
    "parentId": 1,
    icon: "pe-7s-notebook",
    label: "Subject Group",
     to: "/Subject/Subjectgrouplist",
  },
  {
    "id": 6,
    "parentId": 1,
    icon: "pe-7s-study",
    label: "Subject",
     to: "/Subject/Subjectlist",
  },
  
 ];
 export const Formstructure = [
   {
     icon: "lnr-users",
     label: "Executive Program",
     to: "/Applicationformdesign/Formexecutiveprogram",
   }, 
   {
     icon: "pe-7s-notebook",
     label: "Course",
     to: "/Campus/Institutedpt",
   },
   {
    icon: "lnr-user",
    label: "School Of Design",
    to: "/Applicationformdesign/Formschooldesign",
  }, 
 ];
export const Design = [
  {
    "id": 1,
    icon: "pe-7s-note2",
    "label": "Form Designer/Builder"
  },
  {
    "id": 2,
    "parentId": 1,
    icon: "pe-7s-note2",
    label: "Work Flow",
        to: "/workflow/Reusableprcoess",
      
  },
  {
    icon: "pe-7s-note2",
    label: "Form Builder",
        to: "/FormBuilder/Formbuildersurvey",
  },
  {
    "id": 3,
    "parentId": 1,
    icon: "lnr-apartment",
    label: "FormDesigner",
    to: "/FormBuilder/Formdesignercreation",
  },
  {
    "id": 4,
    "parentId": 1,
    icon: "pe-7s-note2",
    label: "Form List",
        to: "/FormBuilder/Formlist",
  },
  /* {
    icon: "pe-7s-keypad",
    label: "Form",
        to: "/FormBuilder/Formbase",
      
  }, */


];

export const MasterData = [
  {
    icon: "pe-7s-date",
    label: "Event Group",
        to: "/AdmissionCalendar/EventGroup",
      
  },
  {
    icon: "pe-7s-date",
    label: "Program Group",
        to: "/Program/ProgramGrouplist",
      
  },
  {
    icon: "pe-7s-date",
    label: "Admission Calendar",
        to: "/AdmissionCalendar/Eventgrouplist",
      
  },
 
];

export const AdmissionStageProgress = [
 {
   icon: "lnr-user",
   label: "Applications",
   to: "/AdmissionStageProgress/AdmissionStageProgressApplications",
 }, 
  {
  icon: "lnr-user",
  label: "Withdraw Applications",
  to: "/AdmissionStageProgress/AdmissionStageProgressWithdrawApplications",
}, 
];

