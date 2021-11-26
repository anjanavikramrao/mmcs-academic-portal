create table education_group
(
code integer primary key,
group_type text NOT NULL References group_type(code),
educationgroup_name text NOT NULL ,
parenteducationgroup int References education_group(code),
country_registered  text NOT NULL References country(code),
currency text NOT NULL References currency(code),
address jsonb,
language text NOT NULL References language (code),
key_people jsonb,
contact_details jsonb,
operating_countries jsonb,
company_code  text References company(code),
company_name text,
website text,
email text,
logo_url text,
society_name text,
abbreviation text,
vision_statements jsonb,
created_time timestamp with time zone,
created_user text,
last_modified_time timestamp with time zone DEFAULT now(),
last_modified_user text
);




