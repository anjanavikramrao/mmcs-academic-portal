create table university
(
code integer primary key,
for_profit bool,
universitytype text NOT NULL References university_type(code),
university_name text,
education_group text NOT NULL References education_group(code),
country_registered  text NOT NULL References country(code),
currency text NOT NULL References currency(code),
address jsonb,
language text NOT NULL References language(code),
vision_statements jsonb,
mou_signed_Organisation text,
 institution_industry_corporatehouse_Name text,
 mou_signing_year int,
duration int,
mou_actual_activities_yearwise jsonb,
mou_participated_students_teachers_Number int
);
