create table institution_group
(
code integer primary key,
group_type text NOT NULL References group_type(code),
institutiongroup_name text,
sequence_number int,
country_registered  text NOT NULL References country(code),
currency text NOT NULL References currency(code),
language text NOT NULL References language (code),
address jsonb,
vision_statements jsonb,
university text NOT NULL References university(code),
education_group text NOT NULL References education_group(code)
);
