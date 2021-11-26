create table department
(
code integer primary key,
department_name text,
department_head text,
department_type text
address jsonb,
language text NOT NULL References language (code),
vision_statements jsonb,
education_group text NOT NULL References education_group(code),
university text NOT NULL References university(code),
institution text NOT NULL References institution_group(code),
campusinstitution text NOT NULL References campusinstitution(institution_id)
);
